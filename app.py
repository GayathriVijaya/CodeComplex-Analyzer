
from flask import Flask, render_template, request

from analyzer.complexity import compute_cyclomatic_complexity, explain_complexity_detailed
from analyzer.suggestions import analyze_code_for_suggestions, refactor_split_function,suggest_and_refactor

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    code = ""
    complexity = None
    explanation = None

    if request.method == 'POST':
        code = request.form['code']
        complexity = compute_cyclomatic_complexity(code)
        explanation = None

        # AJAX support for just form area (no extra header/footer)
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return render_template('form_partial.html', code=code, complexity=complexity, explanation=explanation)

    return render_template('index.html', code=code, complexity=complexity, explanation=explanation)

@app.route('/explanation', methods=['POST'])
def explanation():
    code = request.form.get('code', '')
    explanation = explain_complexity_detailed(code)
    return render_template('explanation_box.html', code=code, explanation=explanation)

@app.route('/suggest_reduction', methods=['POST'])
def suggest_reduction():
    code = request.form['code']
    suggestions = analyze_code_for_suggestions(code)
    return render_template('suggestion_card.html', suggestions=suggestions)


@app.route('/reduce', methods=['POST'])
def reduce():
    code = request.form['code']
    suggestions, refactored_code = suggest_and_refactor(code, apply_fix=True)
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render_template('reduced_code_box.html', refactored_code=refactored_code)
    
    return render_template('reduced_code_box.html', refactored_code=refactored_code)
# Add these routes to your existing app.py

@app.route('/compare', methods=['GET', 'POST'])
def compare():
    if request.method == 'POST':
        code1 = request.form.get('code1', '')
        code2 = request.form.get('code2', '')
        
        # Calculate complexities
        complexity1 = compute_cyclomatic_complexity(code1)
        complexity2 = compute_cyclomatic_complexity(code2)
        
        # Get explanations
        explanation1 = explain_complexity_detailed(code1)
        explanation2 = explain_complexity_detailed(code2)
        
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return render_template('comparison/compare_results.html', 
                                 complexity1=complexity1, complexity2=complexity2,
                                 explanation1=explanation1, explanation2=explanation2,
                                 code1=code1, code2=code2)
        
        return render_template('comparison/compare.html',
                             complexity1=complexity1, complexity2=complexity2,
                             explanation1=explanation1, explanation2=explanation2,
                             code1=code1, code2=code2, results=True)
    
    return render_template('comparison/compare.html')




@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
