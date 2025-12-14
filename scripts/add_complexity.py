#!/usr/bin/env python3
"""
Script to add time and space complexity fields to questions.json
Based on patterns, assigns appropriate complexity values
"""

import json
import sys
from pathlib import Path

# Pattern-based complexity mapping (optimal solution for each pattern)
COMPLEXITY_MAP = {
    "Arrays": {"time": "O(n)", "space": "O(1)"},
    "Sliding Window": {"time": "O(n)", "space": "O(1)"},
    "Two Pointers": {"time": "O(n)", "space": "O(1)"},
    "Fast & Slow Pointers": {"time": "O(n)", "space": "O(1)"},
    "Binary Search": {"time": "O(log n)", "space": "O(1)"},
    "BFS": {"time": "O(V + E)", "space": "O(V)"},
    "DFS": {"time": "O(V + E)", "space": "O(V)"},
    "Backtracking": {"time": "O(2^n) or O(n!)", "space": "O(n)"},
    "Dynamic Programming": {"time": "O(n) or O(n²)", "space": "O(n) or O(n²)"},
    "Greedy": {"time": "O(n log n)", "space": "O(1)"},
    "Heap": {"time": "O(n log k)", "space": "O(k)"},
    "Graph": {"time": "O(V + E)", "space": "O(V)"},
    "Intervals": {"time": "O(n log n)", "space": "O(1)"},
    "Trie": {"time": "O(m)", "space": "O(ALPHABET_SIZE * N * M)"},
    "Union Find": {"time": "O(α(n))", "space": "O(n)"},
    "Topological Sort": {"time": "O(V + E)", "space": "O(V)"},
    "Bit Manipulation": {"time": "O(n)", "space": "O(1)"},
    "Sorting": {"time": "O(n log n)", "space": "O(1)"},
    "Bucket Sort": {"time": "O(n)", "space": "O(n)"},
    "QuickSelect": {"time": "O(n)", "space": "O(1)"},
    "In-place reversal of a linked list": {"time": "O(n)", "space": "O(1)"},
    "Design": {"time": "Varies", "space": "Varies"},
}

def get_complexity_for_patterns(patterns):
    """
    Determine complexity based on patterns.
    For multiple patterns, use the most complex one or combine appropriately.
    """
    if not patterns:
        return {"time": "O(n)", "space": "O(1)"}
    
    # For single pattern, return its complexity
    if len(patterns) == 1:
        pattern = patterns[0]
        return COMPLEXITY_MAP.get(pattern, {"time": "O(n)", "space": "O(1)"})
    
    # For multiple patterns, prioritize certain patterns
    # DP and Backtracking are usually the dominant complexity
    if "Dynamic Programming" in patterns:
        return COMPLEXITY_MAP["Dynamic Programming"]
    if "Backtracking" in patterns:
        return COMPLEXITY_MAP["Backtracking"]
    if "BFS" in patterns or "DFS" in patterns:
        return COMPLEXITY_MAP["BFS"]
    
    # Default to first pattern's complexity
    return COMPLEXITY_MAP.get(patterns[0], {"time": "O(n)", "space": "O(1)"})

def add_complexity_to_questions(input_file, output_file=None):
    """Add time and space complexity to all questions"""
    if output_file is None:
        output_file = input_file
    
    # Read the JSON file
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add complexity to each question
    for question in data['data']:
        if 'timeComplexity' not in question:
            complexity = get_complexity_for_patterns(question.get('pattern', []))
            question['timeComplexity'] = complexity['time']
            question['spaceComplexity'] = complexity['space']
    
    # Write back to file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Added complexity fields to {len(data['data'])} questions")
    print(f"Output written to {output_file}")

if __name__ == "__main__":
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    questions_file = repo_root / "src" / "data" / "questions.json"
    
    if not questions_file.exists():
        print(f"Error: {questions_file} not found")
        sys.exit(1)
    
    add_complexity_to_questions(questions_file)

