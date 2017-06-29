$(function () {
	var stack = [],
		hist_stack = [],
		running_total = [],
		current_value = 0,
		limit = 10;

	var displayStack = function() {
		var output = 0,
			h_out = 0;

		if (stack.length > 0) {
			output = stack.join('');
		}
		if (hist_stack.length > 0) {
			h_out = hist_stack.join(' ');
		}	
		$('#input').html(output);
		$('#history').html(h_out);
	}

	$('button').on('click', function () {
		var val = $(this).attr('value');
		
		if (val == 'c') {
			stack = [];
			hist_stack = [];
			running_total = [];
			current_value = 0;
		} else if (val == '0') {
			if (stack.length > 0 && stack.length <= limit) {
				stack.push(val);
			}

		} else if (val == '.') {
			if (stack.length > 0 && stack.length <= limit && $.inArray(val,stack) == -1) {
				stack.push(val);
			} else if (stack.length === 0) {
				stack.push(0);
				stack.push(val);
			}

		} else if (!isNaN(val) && stack.length <= limit) {
			stack.push(Number(val));
		} else if (val == '+' || val =='-' || val=='*' || val=='/') {
			if (stack.length > 0) {
				var num = Number(stack.join(''));
				hist_stack = hist_stack.concat(num);
				hist_stack.push(val);
				if (running_total.length == 0) {
					running_total.push(num);
					running_total.push(val);
				} else {
					running_total.push(num);
					var sub_total = calculate(running_total);
					running_total = [];
					running_total.push(sub_total);
					running_total.push(val);
				}
				stack = [];
			}
		} else if (val == '=') {
			if (stack.length > 0) {
				var num = Number(stack.join(''));
				running_total.push(num);
				var sub_total = calculate(running_total);
				stack = [];
				stack.push(sub_total);
				hist_stack = [];
			}	
		}

		displayStack();
	});

	function calculate(arr) {
		switch(arr[1]) {
			case '+':
				return arr[0] + arr[2];
				break;
			case '-':
				return arr[0] - arr[2];
				break;
			case '*':
				return arr[0] * arr[2];
				break;
			case '/':
				return arr[0] / arr[2];
				break;
			default: break;
		}	
	}
	
});