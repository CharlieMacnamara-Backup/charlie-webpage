const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Checks MDX files for common syntax issues
 */
function checkMdxSyntax() {
  console.log('Checking MDX files for syntax issues...');
  
  // Find all MDX files in the src directory
  const mdxFiles = glob.sync('src/app/blog/**/*.mdx');
  
  let stats = {
    filesChecked: 0,
    issuesFound: 0,
    warnings: []
  };
  
  // Common issues to check for
  const syntaxPatterns = [
    {
      pattern: /\/ ([\w]+)["']?>/g,
      message: 'Malformed self-closing tag found with attribute after slash',
      fix: (content) => content.replace(/\/ ([\w]+)(["'])?>/g, ' $1$2 />')
    },
    {
      pattern: /<(SingleImage|TwoColGrid|ThreeColGrid)[^>]*>(?![\s\S]*?<\/\1>)(?![\s\S]*?\/\s*>)/g,
      message: 'Image component without proper closing',
      fix: null // Too complex for automatic fixing
    },
    {
      pattern: /blogSlug=["']blog["']/g,
      message: 'Generic "blog" slug used instead of specific blog slug',
      fix: null // Need context to fix this
    }
  ];
  
  // Process each MDX file
  mdxFiles.forEach(mdxFile => {
    try {
      const blogName = mdxFile.split(path.sep)[2]; // src/app/blog/[blogName]/page.mdx
      const content = fs.readFileSync(mdxFile, 'utf8');
      let fileIssues = 0;
      let updatedContent = content;
      
      // Check for each pattern
      syntaxPatterns.forEach(({ pattern, message, fix }) => {
        const matches = content.match(pattern);
        
        if (matches && matches.length > 0) {
          const lineNumbers = findLineNumbers(content, matches);
          stats.warnings.push({
            file: mdxFile,
            message: message,
            matches: matches.length,
            lines: lineNumbers.join(', ')
          });
          
          fileIssues += matches.length;
          
          // Apply fix if available
          if (fix) {
            updatedContent = fix(updatedContent);
          }
        }
      });
      
      if (fileIssues > 0) {
        console.log(`⚠️ ${mdxFile}: Found ${fileIssues} issue(s)`);
        stats.issuesFound += fileIssues;
        
        // Write fixed content if it's different
        if (updatedContent !== content) {
          const backupPath = `${mdxFile}.backup`;
          fs.writeFileSync(backupPath, content, 'utf8');
          fs.writeFileSync(mdxFile, updatedContent, 'utf8');
          console.log(`   Fixed issues automatically and saved backup to ${backupPath}`);
        } else {
          console.log('   Issues require manual fixing.');
        }
      } else {
        console.log(`✓ ${mdxFile}: No syntax issues found`);
      }
      
      stats.filesChecked++;
    } catch (error) {
      console.error(`✗ [Error] Failed to process ${mdxFile}: ${error.message}`);
    }
  });
  
  return stats;
}

/**
 * Find line numbers for pattern matches in content
 * @param {string} content - File content
 * @param {Array} matches - Array of matches
 * @returns {Array} - Array of line numbers
 */
function findLineNumbers(content, matches) {
  const lines = content.split('\n');
  const lineNumbers = [];
  
  matches.forEach(match => {
    let currentIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(match)) {
        lineNumbers.push(i + 1); // 1-indexed line number
        break;
      }
      currentIndex += lines[i].length + 1; // +1 for the newline
    }
  });
  
  return lineNumbers;
}

// Run the checks
const stats = checkMdxSyntax();

console.log('\nMDX Syntax Check Complete!');
console.log(`- Files checked: ${stats.filesChecked}`);
console.log(`- Issues found: ${stats.issuesFound}`);

if (stats.warnings.length > 0) {
  console.log('\nDetailed warnings:');
  stats.warnings.forEach(warning => {
    console.log(`- ${warning.file}:`);
    console.log(`  ${warning.message} (${warning.matches} occurrences)`);
    console.log(`  Lines: ${warning.lines}`);
  });
  
  console.log('\nNext steps:');
  console.log('1. Review each file with issues and fix them manually if they were not automatically fixed');
  console.log('2. Use proper JSX syntax: self-closing tags should be <Component prop="value" />');
  console.log('3. Run this script again to verify all issues are resolved');
} else {
  console.log('\nGreat! No syntax issues found in MDX files.');
} 