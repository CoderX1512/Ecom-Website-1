from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017")

db = client.fakestore
collection = db.products


# CREATE operation
@app.route('/products', methods=['POST'])
def create_products():
    data = request.get_json()

    # Extract the _id from the JSON body
    product_id = data.get('_id')

    # Ensure the _id is unique
    if collection.find_one({'_id': product_id}):
        return jsonify({"message": "Employee with this _id already exists"}), 400

    insert_result = collection.insert_one(data)
    return jsonify({"message": "Product created successfully", "id": str(insert_result.inserted_id)}), 201




# CREATE operation with multiple products(Using this we can insert the products json array at once)
# @app.route('/products', methods=['POST'])
# def create_products():
#     try:
#         data = request.get_json()
#         if isinstance(data, list):
#             # Insert each product into the collection
#             inserted_ids = []
#             for product in data:
#                 insert_result = collection.insert_one(product)
#                 inserted_ids.append(str(insert_result.inserted_id))
#
#             return jsonify({"message": "Products added successfully", "ids": inserted_ids}), 201
#         else:
#             return jsonify({"message": "Invalid JSON data format. Expected an array."}), 400
#     except Exception as e:
#         return jsonify({"message": str(e)}), 400





# READ operation(Retrieve all employees)
@app.route('/products', methods=['GET'])
def get_products():
    products = list(collection.find())
    for product in products:
        product['_id'] = str(product['_id'])  # Convert ObjectId to string
    return jsonify(products), 200


# UPDATE Operation
@app.route('/products/<product_id>', methods=['PUT'])
def update_employee(product_id):
    data = request.get_json()
    update_result = collection.update_one({'_id': ObjectId(product_id)}, {'$set': data})
    if update_result.modified_count > 0:
        return jsonify({"message": "Product updated successfully"}), 200
    else:
        return jsonify({"message": "Product Not Found"}), 404


# DELETE Operation
@app.route('/products/<product_id>', methods=['DELETE'])
# I have written logic of delete operation for two different cases (for integer product_id and 12-byte input or 24-character hex string)

def delete_product(product_id):
    try:
        # Attempt to convert the product_id to an integer
        product_id_int = int(product_id)

        # Construct a query that matches the numeric ID
        query = {"$or": [{"_id": product_id_int}]}
        # For constructing a query that matches either ObjectId or the numeric ID
        # query = {"$or": [{"_id": product_id_int}, {"_id": ObjectId(product_id)}]}

        # Delete the document using the query
        delete_result = collection.delete_one(query)

        if delete_result.deleted_count > 0:
            return jsonify({"message": "Product deleted successfully"}), 200
        else:
            return jsonify({"message": "Product Not Found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 400


# def delete_employee(product_id):
#     delete_result = collection.delete_one({'_id': ObjectId(product_id)})
#     if delete_result.deleted_count > 0:
#         return jsonify({"message": "Employee deleted successfully"}), 200
#     else:
#         return jsonify({"message": "Employee Not Found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
