from flask import Flask, request, jsonify

app = Flask(__name__)

# User details
USER_ID = "john_doe_17091999"
EMAIL = "john@xyz.com"
ROLL_NUMBER = "ABCD123"


@app.route("/bfhl", methods=["GET", "POST"])
def bfhl():
    if request.method == "POST":
        data = request.get_json()
        if not data or "data" not in data:
            return jsonify({"is_success": False}), 400

        input_data = data["data"]
        numbers = [item for item in input_data if item.isdigit()]
        alphabets = [item for item in input_data if item.isalpha()]

        highest_alphabet = []
        if alphabets:
            highest_alphabet.append(max(alphabets, key=str.upper))

        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet,
        }
        return jsonify(response)

    elif request.method == "GET":
        return jsonify({"operation_code": 1}), 200


if __name__ == "__main__":
    app.run(debug=True)
