import re

def analyze_code_for_suggestions(code):
    suggestions = []
    
    # Detect long functions by heuristic (>20 lines inside function body)
    functions = re.findall(r'(void|int|bool|char|double|float)\s+(\w+)\s*\([^)]*\)\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}', code, re.DOTALL)
    for ret_type, name, body in functions:
        lines = body.strip().split('\n')
        if len(lines) > 20:
            suggestions.append(f"Function '{name}' is long ({len(lines)} lines). Consider splitting into smaller functions.")

    # Detect deep nesting by counting "{" following 'if' occurrences (simple heuristic)
    nesting_levels = []
    if_positions = [m.start() for m in re.finditer(r'\bif\s*\(', code)]
    for pos in if_positions:
        count = 0
        substring = code[pos:]
        for ch in substring:
            if ch == '{':
                count += 1
            elif ch == '}':
                break
        nesting_levels.append(count)
    if nesting_levels and max(nesting_levels) > 2:
        suggestions.append("Deep nesting detected. Refactor nested conditionals into separate functions or use strategy pattern.")

    # Detect repeated loops (simple presence check)
    if re.search(r'\bfor\s*\(', code) or re.search(r'\bwhile\s*\(', code):
        suggestions.append("Loops detected. Extract loop bodies into helper functions to reduce complexity.")

    # If no suggestions found, clearly say so
    if not suggestions:
        suggestions.append("No obvious complexity reduction suggestions found. The code may already have minimal cyclomatic complexity.")

    return suggestions



def refactor_split_function(code):
    """
    A practical simple splitter that extracts inner while-loop body inside a helper function.
    This example targets a common nested while loop inside functions.
    """

    # Match a while loop inside a function and extract to helper function
    pattern = re.compile(
        r'(void|int|bool|char|double|float)\s+(\w+)\s*\([^)]*\)\s*{'   # function header
        r'([\s\S]*?)'                                                 # function body (non-greedy)
        r'while\s*\(([^)]*)\)\s*{'                                    # while loop start
        r'([\s\S]*?)'                                                 # while loop body (non-greedy)
        r'}([\s\S]*?)'                                                # after while body
        r'}',                                                        # function close
        re.MULTILINE
    )

    def replacement(match):
        ret_type, fn_name, before_while, while_cond, while_body, after_while = match.groups()
        # Create helper function name
        helper_name = f"{fn_name}_while_helper"

        # Define helper function (trim indentation for simplicity)
        helper_function = f"{ret_type} {helper_name}() {{\n{while_body.strip()}\n}}\n\n"

        # Replace while loop with call to helper function with updated condition logic
        updated_body = before_while + f"\n{helper_name}();\n" + after_while

        return helper_function + f"{ret_type} {fn_name}() {{\n{updated_body.strip()}\n}}"

    # Apply pattern substitution
    new_code, count = pattern.subn(replacement, code)
    if count == 0:
        # No applicable while loops found - return original
        return "/* No inner while loops found to extract; no refactoring applied */\n" + code
    else:
        return "/* Refactored: extracted while loop to helper function */\n" + new_code


def suggest_and_refactor(code, apply_fix=False):
    suggestions = analyze_code_for_suggestions(code)
    if apply_fix and suggestions:
        # Apply refactor function for real code changes
        code = refactor_split_function(code)
        return suggestions, code
    return suggestions, code
