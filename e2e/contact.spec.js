const { test, expect } = require('@playwright/test')

const { CONTACT_ENDPOINT } = require('./helpers')

// Scoped to the form: "Email" also matches the footer's mail icon (aria-label).
function contactForm(page) {
  return page.getByRole('form', { name: 'Contact form' })
}

// Next injects a route announcer with role="alert", so an unscoped
// getByRole('alert') matches two elements. Scope to the form's own alert.
function contactAlert(page) {
  return page.locator('p[role="alert"]')
}

function submitButton(page) {
  return contactForm(page).getByRole('button', { name: 'Request Quote' })
}

async function fillForm(page) {
  const form = contactForm(page)
  await form.getByLabel('Name').fill('Jane Tester')
  await form.getByLabel('Email').fill('lead@example.com')
  await form.getByLabel('Message').fill('Please quote for a new site.')
}

test.describe('contact form', () => {
  test('renders the fields and the primary action', async ({ page }) => {
    await page.goto('/contact/')

    const form = contactForm(page)
    await expect(form.getByLabel('Name')).toBeVisible()
    await expect(form.getByLabel('Email')).toBeVisible()
    await expect(form.getByLabel('Message')).toBeVisible()
    await expect(submitButton(page)).toBeVisible()
    await expect(page.getByText('Replies within 24 hours')).toBeVisible()
  })

  test('empty submit is rejected without hitting the network', async ({
    page,
  }) => {
    let requests = 0
    await page.route(CONTACT_ENDPOINT, async (route) => {
      requests += 1
      await route.fulfill({ status: 200, body: '{"success":true}' })
    })

    await page.goto('/contact/')
    await submitButton(page).click()

    await expect(page.getByText('Please fill in all fields.')).toBeVisible()
    expect(requests, 'client validation should block the request').toBe(0)
  })

  test('an invalid email is rejected client-side', async ({ page }) => {
    await page.goto('/contact/')

    const form = contactForm(page)
    await form.getByLabel('Name').fill('Jane Tester')
    await form.getByLabel('Email').fill('not-an-email')
    await form.getByLabel('Message').fill('hello')
    await submitButton(page).click()

    await expect(page.getByText('Please enter a valid email.')).toBeVisible()
  })

  test('a valid submission sends the payload and confirms', async ({
    page,
  }) => {
    let payload
    await page.route(CONTACT_ENDPOINT, async (route) => {
      payload = route.request().postDataJSON()
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"success":true}',
      })
    })

    await page.goto('/contact/')
    await fillForm(page)
    await submitButton(page).click()

    await expect(page.getByText('Message received.')).toBeVisible()
    expect(payload).toEqual({
      name: 'Jane Tester',
      email: 'lead@example.com',
      message: 'Please quote for a new site.',
    })
  })

  test('a failed submission keeps the form and warns the visitor', async ({
    page,
  }) => {
    await page.route(CONTACT_ENDPOINT, async (route) => {
      await route.fulfill({ status: 500, body: '{"error":"nope"}' })
    })

    await page.goto('/contact/')
    await fillForm(page)
    await submitButton(page).click()

    await expect(contactAlert(page)).toBeVisible()
    await expect(submitButton(page)).toBeVisible()
  })

  test('a network failure keeps the form and warns the visitor', async ({
    page,
  }) => {
    await page.route(CONTACT_ENDPOINT, (route) => route.abort())

    await page.goto('/contact/')
    await fillForm(page)
    await submitButton(page).click()

    await expect(contactAlert(page)).toBeVisible()
    await expect(submitButton(page)).toBeVisible()
  })
})
