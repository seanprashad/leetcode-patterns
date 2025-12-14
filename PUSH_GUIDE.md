# Guide to Push Changes and Create Pull Request

## Step 1: Fork the Repository (if not done already)

1. Go to https://github.com/seanprashad/leetcode-patterns
2. Click the "Fork" button in the top right
3. This creates a copy under your GitHub account (e.g., `https://github.com/YOUR_USERNAME/leetcode-patterns`)

## Step 2: Add Your Fork as a Remote

```bash
# Add your fork as a remote (replace YOUR_USERNAME with your GitHub username)
git remote add fork https://github.com/YOUR_USERNAME/leetcode-patterns.git

# Verify remotes
git remote -v
# You should see:
# origin    https://github.com/seanprashad/leetcode-patterns.git (original)
# fork      https://github.com/YOUR_USERNAME/leetcode-patterns.git (your fork)
```

## Step 3: Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b add-complexity-and-pattern-guides

# Or use a shorter name
git checkout -b feature/complexity-guides
```

## Step 4: Stage Your Changes

```bash
# Add all changes
git add .

# Or add specific files
git add README.md
git add src/data/questions.json
git add src/components/
git add guides/
git add scripts/
git add LOCAL_SETUP.md
```

## Step 5: Commit Your Changes

```bash
git commit -m "Add time/space complexity analysis and pattern deep-dive guides

- Add timeComplexity and spaceComplexity fields to all 175 questions
- Create comprehensive pattern guides for all 22 coding patterns
- Add Pattern Guides tab in UI with interactive guide viewer
- Display complexity columns in question table
- Make pattern badges clickable linking to guides
- Add script to automatically assign complexity based on patterns
- Update README with new features documentation"
```

## Step 6: Push to Your Fork

```bash
# Push to your fork (replace branch-name with your branch name)
git push fork add-complexity-and-pattern-guides

# Or if you set upstream
git push -u fork add-complexity-and-pattern-guides
```

## Step 7: Create Pull Request

1. Go to your fork on GitHub: `https://github.com/YOUR_USERNAME/leetcode-patterns`
2. You'll see a banner saying "Your recently pushed branches" with a "Compare & pull request" button
3. Click "Compare & pull request"
4. Fill in the PR details:
   - **Title**: "Add Time/Space Complexity Analysis and Pattern Deep-Dive Guides"
   - **Description**: 
     ```
     ## Summary
     
     This PR adds two major features to enhance the educational value of the LeetCode Patterns resource:
     
     ### 1. Time & Space Complexity Analysis
     - Added `timeComplexity` and `spaceComplexity` fields to all 175 questions
     - Complexity values reflect optimal pattern-based solutions
     - Displayed in new columns in the question table
     - Automatically assigned based on patterns using intelligent script
     
     ### 2. Pattern Deep-Dive Guides
     - Created comprehensive guides for all 22 coding patterns
     - Each guide includes: core concept, when to use, template code, related problems, complexity analysis
     - New "Pattern Guides" tab in UI with interactive markdown viewer
     - Pattern badges in table are now clickable and link to guides
     
     ## Files Changed
     - Added 22 pattern guide markdown files in `/guides`
     - Added complexity fields to `src/data/questions.json`
     - Updated UI components to display complexity and pattern guides
     - Added script for complexity assignment
     
     ## Testing
     - All guides render correctly in the UI
     - Complexity columns display properly
     - Pattern badges link to correct guides
     - No breaking changes to existing functionality
     ```
5. Click "Create pull request"

## Alternative: Quick Push Commands

If you want to do it all at once:

```bash
# 1. Create branch
git checkout -b feature/complexity-guides

# 2. Add all files
git add .

# 3. Commit
git commit -m "Add time/space complexity analysis and pattern deep-dive guides"

# 4. Push (after adding your fork remote)
git push -u fork feature/complexity-guides
```

## Troubleshooting

### If you get "remote fork already exists"
```bash
git remote remove fork
git remote add fork https://github.com/YOUR_USERNAME/leetcode-patterns.git
```

### If you need to update your fork
```bash
git fetch origin
git merge origin/main
git push fork
```

### If you want to update your branch
```bash
git fetch origin
git rebase origin/main
git push fork --force-with-lease
```

