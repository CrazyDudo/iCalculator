Page({
  data: {
    display: '0',
    currentValue: '0',
    previousValue: '',
    operator: '',
    shouldResetDisplay: false,
    theme: 'dark'
  },

  onDigit: function(e) {
    var digit = e.currentTarget.dataset.digit;
    var currentValue = this.data.currentValue;
    var shouldResetDisplay = this.data.shouldResetDisplay;

    if (shouldResetDisplay || currentValue === '0') {
      currentValue = digit;
      shouldResetDisplay = false;
    } else {
      currentValue += digit;
    }

    this.setData({ 
      display: currentValue, 
      currentValue: currentValue, 
      shouldResetDisplay: shouldResetDisplay 
    });
  },

  onOperator: function(e) {
    var newOperator = e.currentTarget.dataset.operator;
    var currentValue = this.data.currentValue;
    var previousValue = this.data.previousValue;
    var operator = this.data.operator;

    if (previousValue && operator) {
      currentValue = this.calculate(previousValue, currentValue, operator);
    }

    this.setData({
      previousValue: currentValue,
      currentValue: '',
      operator: newOperator,
      display: currentValue,
      shouldResetDisplay: true
    });
  },

  onEqual: function() {
    var currentValue = this.data.currentValue;
    var previousValue = this.data.previousValue;
    var operator = this.data.operator;
    if (previousValue && operator) {
      var result = this.calculate(previousValue, currentValue, operator);
      this.setData({
        display: result,
        currentValue: result,
        previousValue: '',
        operator: '',
        shouldResetDisplay: true
      });
    }
  },

  onClear: function() {
    this.setData({
      display: '0',
      currentValue: '0',
      previousValue: '',
      operator: '',
      shouldResetDisplay: false
    });
  },

  onDelete: function() {
    var currentValue = this.data.currentValue;
    if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = '0';
    }
    this.setData({ display: currentValue, currentValue: currentValue });
  },

  onTheme: function() {
    var newTheme = this.data.theme === 'dark' ? 'light' : 'dark';
    this.setData({ theme: newTheme });
  },

  calculate: function(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    var result;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = a / b; break;
      default: result = b;
    }
    return result.toString();
  }
});