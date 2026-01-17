import re

def compute_cyclomatic_complexity(code: str) -> int:
    """
    Compute cyclomatic complexity for C++ code (classical McCabe version).
    """
    complexity = 1  # Base path

    # Patterns for decision points (excluding logical ops)
    patterns = [
        r'(?<!else\s)if\s*\(',   # if
        r'\belse\s+if\s*\(',     # else if
        r'\bwhile\s*\(',         # while
        r'\bfor\s*\(',           # for
        r'\bcase\s+',            # case
        r'\?\s*',                # ternary operator ?:
    ]

    # Remove single-line and multi-line comments
    code = re.sub(r'//.*', '', code)
    code = re.sub(r'/\*.*?\*/', '', code, flags=re.DOTALL)

    # Count decision points
    for pattern in patterns:
        matches = re.findall(pattern, code)
        complexity += len(matches)

    return complexity


import re
import re

def explain_complexity_detailed(code: str) -> str:
    """
    Explain cyclomatic complexity line-by-line with brief rationale.
    """
    patterns = {
        'if': r'(?<!else\s)if\s*\(',       # if
        'else if': r'\belse\s+if\s*\(',   # else if
        'while': r'\bwhile\s*\(',          # while
        'for': r'\bfor\s*\(',              # for
        'case': r'\bcase\s+',               # case
        'ternary ?:': r'\?\s*',             # ternary operator
    }

    lines = code.split('\n')
    explanations = []
    total = 0

    for i, line in enumerate(lines, start=1):
        line_stripped = line.strip()
        exp = f"Line {i}: `{line_stripped}`\n"
        decisions = []

        for name, pattern in patterns.items():
            if re.search(pattern, line):
                decisions.append(name)

        if decisions:
            for d in decisions:
                exp += f" - Counts as decision: '{d}', adds +1\n"
            total += len(decisions)
        else:
            if line_stripped == '' or re.match(r'\s*(//|/\*|\*/)', line_stripped):
                exp += " - Ignored (comment or blank line)"
            else:
                exp += " - No decision point here"

        explanations.append(exp)

    # Enhanced formula presentation with creative symbols
    explanations.append(
        
        f"• Decisions found: {total}\n"
        f"• Entry path: 1\n\n"
        f"FORMULA CALCULATION:\n"
        f"Cyclomatic Complexity = decisions + 1\n"
        f"                     = {total} + 1\n"
        f"                     = {total + 1}\n\n"
     
    )

    return "\n\n".join(explanations)

