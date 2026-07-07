'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'

export function ImageModal({ isOpen, onClose, image, description }) {
  if (!image) return null

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-zinc-50 p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                <div className="relative w-full overflow-hidden rounded-lg" style={{ maxHeight: '80vh' }}>
                  <Image
                    src={image}
                    alt={description || ""}
                    className="object-contain"
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto', maxHeight: '80vh' }}
                    priority
                  />
                </div>
                {description && (
                  <div className="mt-4">
                    <Dialog.Description className="text-sm text-zinc-600 dark:text-zinc-400">
                      {description}
                    </Dialog.Description>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full bg-zinc-100/80 p-2 text-zinc-500 hover:text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label="Close dialog"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 