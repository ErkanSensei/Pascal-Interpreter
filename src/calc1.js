/* Token types */
const INTEGER = 'INTEGER';
const PLUS = 'PLUS';
const EOF = 'EOF';

function Token(type, value) {
    // Token type: INTEGER, PLUS, or EOF
    this.type = type;
    // Token value: Single digit #, '+', or null
    this.value = value;

    this.__str__ = function() {
        /* String representation of the class instance.
            Ex: Token(INTEGER, 3),
                Token(PLUS, '+')
        */
        return {
            type: this.type,
            value: this.value.toString()
        }
    }

    this.__repr__ = function() {
        return this.__str__();
    }
}

function Interpreter(text) {
    // string input, ex: '3+5'
    this.text = text;
    // this.pos is an index into this.text
    this.pos = 0;
    // current token instance
    this.current_token = null

    this.error = function() {
        console.error('Error parsing input')
    }

    this.get_next_token = function() {
        // Breaks input into tokens
        const text = this.text;

        // Is this.pos past the end of this.text?
        // If it is, then return EOF token

        // Input left to convert into tokens
        if (this.post > text.length - 1) {
            return new Token(EOF, null);
        }

        // Get a character at position this.pos
        // Decide what token to create based on that

        const current_char = text[this.pos];
        /* If the character is a digit, convert to an int,
        create an INTEGER token, increment this.pos index
        to point to the next character after the digit,
        and return the INTEGER token */
        if (typeof Number(current_char) === 'number' && !isNaN(Number(current_char))) {
            let token = new Token(INTEGER, Number(current_char));
            this.pos += 1;
            return token;
        }

        if (current_char === '+') {
            let token = new Token(PLUS, current_char);
            this.pos += 1;
            return token;
        }
        return;
    }

    this.eat = function(token_type) {
        /* Compare the current token type with the passed token type
        and if they match then 'eat' the current token and assign
        the next token to this.current_token, otherwise
        throw an error. */
        if (this.current_token.type === token_type) {
            this.current_token = this.get_next_token();
        }
        else {
            return false;
        }
    }
    this.expr = function() {
        // 'expr -> INTEGER PLUS INTEGER'
        // set current token to the first token taken from the input
        this.current_token = this.get_next_token();

        // We expect the current token to be a single-digit integer
        const left = this.current_token;
        this.eat(INTEGER);

        // We expect the current token to be a '+' token
        const op = this.current_token;
        this.eat(PLUS);

        // We expect the current token to be a single-digit integer
        const right = this.current_token;
        this.eat(INTEGER);

        // Right after this call, this.current_token is EOF

        // We return the result
        return (left.value + right.value);
    }
}

function main() {
    const interpreter = new Interpreter('4+5');
    const result = interpreter.expr();
    console.log(result);
}

main();