#!/bin/bash

# Function to handle API errors
handle_error() {
  local response=$1
  local context=$2
  local error_message=$(echo $response | jq -r '.message // empty')
  if [ -n "$error_message" ]; then
    echo "Error in $context: $error_message"
    exit 1
  fi
}

# Function to create a user
create_user() {
  echo "Creating User..."
  user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
  http://localhost:5000/api/users)
  echo "User Response: $user_response" # Debugging line
  handle_error "$user_response" "create_user"
  user_id=$(echo $user_response | jq -r '._id')
  if [ "$user_id" != "null" ]; then
    echo "User created with ID: $user_id"
  else
    echo "Failed to create user."
    exit 1
  fi
}

# Function to create an inventory item
create_inventory() {
  echo "Creating Inventory Item..."
  inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "Paracetamol", "quantity": 100, "expirationDate": "2024-12-31"}' \
  http://localhost:5000/api/inventory)
  echo "Inventory Response: $inventory_response" # Debugging line
  handle_error "$inventory_response" "create_inventory"
  item_id=$(echo $inventory_response | jq -r '._id')
  if [ "$item_id" != "null" ]; then
    echo "Inventory item created with ID: $item_id"
  else
    echo "Failed to create inventory item."
    exit 1
  fi
}

# Function to create an order
create_order() {
  echo "Creating Order..."
  order_payload=$(jq -n \
    --arg userId "$user_id" \
    --arg itemId "$item_id" \
    '{"userId": $userId, "items": [{"itemId": $itemId, "quantity": 10}], "status": "Pending"}')
  echo "Order Payload: $order_payload" # Debugging line
  order_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$order_payload" \
  http://localhost:5000/api/orders)
  echo "Order Response: $order_response" # Debugging line
  handle_error "$order_response" "create_order"
  order_id=$(echo $order_response | jq -r '._id')
  if [ "$order_id" != "null" ]; then
    echo "Order created with ID: $order_id"
  else
    echo "Failed to create order."
    exit 1
  fi
}

# Function to create a supplier
create_supplier() {
  echo "Creating Supplier..."
  supplier_payload=$(jq -n \
    --arg itemId "$item_id" \
    '{"name": "Supplier Inc.", "contactInfo": "contact@supplier.com", "itemsSupplied": [{"itemId": $itemId}]}')
  echo "Supplier Payload: $supplier_payload" # Debugging line
  supplier_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$supplier_payload" \
  http://localhost:5000/api/suppliers)
  echo "Supplier Response: $supplier_response" # Debugging line
  handle_error "$supplier_response" "create_supplier"
  supplier_id=$(echo $supplier_response | jq -r '._id')
  if [ "$supplier_id" != "null" ]; then
    echo "Supplier created with ID: $supplier_id"
  else
    echo "Failed to create supplier."
    exit 1
  fi
}

# Function to create FDA data
create_fda_data() {
  echo "Creating FDA Data..."
  fda_data_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"drugName": "Ibuprofen", "shortageStatus": "Available", "details": "No shortage"}' \
  http://localhost:5000/api/fda)
  echo "FDA Data Response: $fda_data_response" # Debugging line
  handle_error "$fda_data_response" "create_fda_data"
  fda_data_id=$(echo $fda_data_response | jq -r '._id')
  if [ "$fda_data_id" != "null" ]; then
    echo "FDA data created with ID: $fda_data_id"
  else
    echo "Failed to create FDA data entry."
    exit 1
  fi
}

# Function to run tests with invalid data
run_invalid_tests() {
  echo "Running tests with invalid data..."

  # Invalid user creation
  invalid_user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "", "email": "invalid-email", "password": ""}' \
  http://localhost:5000/api/users)
  echo "Invalid User Response: $invalid_user_response" # Debugging line

  # Invalid inventory creation
  invalid_inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "", "quantity": -1, "expirationDate": "invalid-date"}' \
  http://localhost:5000/api/inventory)
  echo "Invalid Inventory Response: $invalid_inventory_response" # Debugging line

  # Invalid order creation
  invalid_order_payload=$(jq -n \
    --arg userId "invalid-id" \
    --arg itemId "invalid-id" \
    '{"userId": $userId, "items": [{"itemId": $itemId, "quantity": -10}], "status": ""}')
  invalid_order_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$invalid_order_payload" \
  http://localhost:5000/api/orders)
  echo "Invalid Order Response: $invalid_order_response" # Debugging line

  # Invalid supplier creation
  invalid_supplier_payload=$(jq -n \
    --arg itemId "invalid-id" \
    '{"name": "", "contactInfo": "invalid-email", "itemsSupplied": [{"itemId": $itemId}]}')
  invalid_supplier_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$invalid_supplier_payload" \
  http://localhost:5000/api/suppliers)
  echo "Invalid Supplier Response: $invalid_supplier_response" # Debugging line

  # Invalid FDA data creation
  invalid_fda_data_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"drugName": "", "shortageStatus": "", "details": ""}' \
  http://localhost:5000/api/fda)
  echo "Invalid FDA Data Response: $invalid_fda_data_response" # Debugging line
}

# Function to run tests with duplicate and overlapping data
run_duplicate_and_overlapping_tests() {
  echo "Running tests with duplicate and overlapping data..."

  # Duplicate user creation
  duplicate_user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
  http://localhost:5000/api/users)
  echo "Duplicate User Response: $duplicate_user_response" # Debugging line

  # Overlapping inventory creation
  overlapping_inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "Paracetamol", "quantity": 100, "expirationDate": "2024-12-31"}' \
  http://localhost:5000/api/inventory)
  echo "Overlapping Inventory Response: $overlapping_inventory_response" # Debugging line

  # Large payload creation
  large_payload=$(jq -n --arg itemId "$item_id" --argjson largeItems "$(seq 1 10000 | jq -R . | jq -s .)" \
    '{"userId": $user_id, "items": $largeItems, "status": "Pending"}')
  large_payload_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$large_payload" \
  http://localhost:5000/api/orders)
  echo "Large Payload Response: $large_payload_response" # Debugging line
}

# Main script execution
echo "Starting API tests..."

create_user
create_inventory

echo "Fetching User ID for order creation..."
user_id=$(curl -s -X GET http://localhost:5000/api/users | jq -r '.[0]._id')
echo "Fetched User ID: $user_id"

echo "Fetching Inventory ID for order creation..."
item_id=$(curl -s -X GET http://localhost:5000/api/inventory | jq -r '.[0]._id')
echo "Fetched Inventory ID: $item_id"

if [ "$user_id" != "" ] && [ "$item_id" != "" ]; then
  create_order
  create_supplier
  create_fda_data
else
  echo "Invalid selection. Exiting."
  exit 1
fi

# Run invalid data testsHere's the updated `test_api_commands.sh` script with additional edge cases for creating users with duplicate emails, creating inventory items with overlapping expiration dates, and handling large payloads:

### Updated `test_api_commands.sh`

```bash
#!/bin/bash

# Function to handle API errors
handle_error() {
  local response=$1
  local context=$2
  local error_message=$(echo $response | jq -r '.message // empty')
  if [ -n "$error_message" ]; then
    echo "Error in $context: $error_message"
    exit 1
  fi
}

# Function to create a user
create_user() {
  echo "Creating User..."
  user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
  http://localhost:5000/api/users)
  echo "User Response: $user_response" # Debugging line
  handle_error "$user_response" "create_user"
  user_id=$(echo $user_response | jq -r '._id')
  if [ "$user_id" != "null" ]; then
    echo "User created with ID: $user_id"
  else
    echo "Failed to create user."
    exit 1
  fi
}

# Function to create an inventory item
create_inventory() {
  echo "Creating Inventory Item..."
  inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "Paracetamol", "quantity": 100, "expirationDate": "2024-12-31"}' \
  http://localhost:5000/api/inventory)
  echo "Inventory Response: $inventory_response" # Debugging line
  handle_error "$inventory_response" "create_inventory"
  item_id=$(echo $inventory_response | jq -r '._id')
  if [ "$item_id" != "null" ]; then
    echo "Inventory item created with ID: $item_id"
  else
    echo "Failed to create inventory item."
    exit 1
  fi
}

# Function to create an order
create_order() {
  echo "Creating Order..."
  order_payload=$(jq -n \
    --arg userId "$user_id" \
    --arg itemId "$item_id" \
    '{"userId": $userId, "items": [{"itemId": $itemId, "quantity": 10}], "status": "Pending"}')
  echo "Order Payload: $order_payload" # Debugging line
  order_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$order_payload" \
  http://localhost:5000/api/orders)
  echo "Order Response: $order_response" # Debugging line
  handle_error "$order_response" "create_order"
  order_id=$(echo $order_response | jq -r '._id')
  if [ "$order_id" != "null" ]; then
    echo "Order created with ID: $order_id"
  else
    echo "Failed to create order."
    exit 1
  fi
}

# Function to create a supplier
create_supplier() {
  echo "Creating Supplier..."
  supplier_payload=$(jq -n \
    --arg itemId "$item_id" \
    '{"name": "Supplier Inc.", "contactInfo": "contact@supplier.com", "itemsSupplied": [{"itemId": $itemId}]}')
  echo "Supplier Payload: $supplier_payload" # Debugging line
  supplier_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$supplier_payload" \
  http://localhost:5000/api/suppliers)
  echo "Supplier Response: $supplier_response" # Debugging line
  handle_error "$supplier_response" "create_supplier"
  supplier_id=$(echo $supplier_response | jq -r '._id')
  if [ "$supplier_id" != "null" ]; then
    echo "Supplier created with ID: $supplier_id"
  else
    echo "Failed to create supplier."
    exit 1
  fi
}

# Function to create FDA data
create_fda_data() {
  echo "Creating FDA Data..."
  fda_data_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"drugName": "Ibuprofen", "shortageStatus": "Available", "details": "No shortage"}' \
  http://localhost:5000/api/fda)
  echo "FDA Data Response: $fda_data_response" # Debugging line
  handle_error "$fda_data_response" "create_fda_data"
  fda_data_id=$(echo $fda_data_response | jq -r '._id')
  if [ "$fda_data_id" != "null" ]; then
    echo "FDA data created with ID: $fda_data_id"
  else
    echo "Failed to create FDA data entry."
    exit 1
  fi
}

# Function to run tests with invalid data
run_invalid_tests() {
  echo "Running tests with invalid data..."

  # Invalid user creation
  invalid_user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "", "email": "invalid-email", "password": ""}' \
  http://localhost:5000/api/users)
  echo "Invalid User Response: $invalid_user_response" # Debugging line

  # Invalid inventory creation
  invalid_inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "", "quantity": -1, "expirationDate": "invalid-date"}' \
  http://localhost:5000/api/inventory)
  echo "Invalid Inventory Response: $invalid_inventory_response" # Debugging line

  # Invalid order creation
  invalid_order_payload=$(jq -n \
    --arg userId "invalid-id" \
    --arg itemId "invalid-id" \
    '{"userId": $userId, "items": [{"itemId": $itemId, "quantity": -10}], "status": ""}')
  invalid_order_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$invalid_order_payload" \
  http://localhost:5000/api/orders)
  echo "Invalid Order Response: $invalid_order_response" # Debugging line

  # Invalid supplier creation
  invalid_supplier_payload=$(jq -n \
    --arg itemId "invalid-id" \
    '{"name": "", "contactInfo": "invalid-email", "itemsSupplied": [{"itemId": $itemId}]}')
  invalid_supplier_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$invalid_supplier_payload" \
  http://localhost:5000/api/suppliers)
  echo "Invalid Supplier Response: $invalid_supplier_response" # Debugging line

  # Invalid FDA data creation
  invalid_fda_data_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"drugName": "", "shortageStatus": "", "details": ""}' \
  http://localhost:5000/api/fda)
  echo "Invalid FDA Data Response: $invalid_fda_data_response" # Debugging line
}

# Function to run tests with duplicate and overlapping data
run_duplicate_and_overlapping_tests() {
  echo "Running tests with duplicate and overlapping data..."

  # Duplicate user creation
  duplicate_user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
  http://localhost:5000/api/users)
  echo "Duplicate User Response: $duplicate_user_response" # Debugging line

  # Overlapping inventory creation
  overlapping_inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "Paracetamol", "quantity": 100, "expirationDate": "2024-12-31"}' \
  http://localhost:5000/api/inventory)
  echo "Overlapping Inventory Response: $overlapping_inventory_response" # Debugging line

  # Large payload creation
  large_items=$(seq 1 10000 | jq -R '. | {"itemId": "66b2dd1fba1210bd63563905", "quantity": 10}' | jq -s .)
  large_payload=$(jq -n --arg userId "$user_id" --argjson items "$large_items" '{"userId": $userId, "items": $items, "status": "Pending"}')
  large_payload_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$large_payload" \
  http://localhost:5000/api/orders)
  echo "Large Payload Response: $large_payload_response" # Debugging line
}

# Main script execution
echo "Starting API tests..."

create_user
create_inventory

echo "Fetching User ID for order creation..."
user_id=$(curl -s -X GET http://localhost:5000/api/users | jq -r '.[0]._id')
echo "Fetched User ID: $user_id"

echo "Fetching Inventory ID for order creation..."
item_id=$(curl -s -X GET http://localhost:5000/api/inventory | jq -r '.[0]._id')
echo "Fetched Inventory ID: $item_id"

if [ "$user_id" != "" ] && [ "$itemTo ensure that the script covers more edge cases, I've expanded it to include tests for creating users with duplicate emails, creating inventory items with overlapping expiration dates, and handling large payloads. Below is the updated script:

### Updated `test_api_commands.sh`

```bash
#!/bin/bash

# Function to handle API errors
handle_error() {
  local response=$1
  local context=$2
  local error_message=$(echo $response | jq -r '.message // empty')
  if [ -n "$error_message" ]; then
    echo "Error in $context: $error_message"
    exit 1
  fi
}

# Function to create a user
create_user() {
  echo "Creating User..."
  user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
  http://localhost:5000/api/users)
  echo "User Response: $user_response"
  handle_error "$user_response" "create_user"
  user_id=$(echo $user_response | jq -r '._id')
  if [ "$user_id" != "null" ]; then
    echo "User created with ID: $user_id"
  else
    echo "Failed to create user."
    exit 1
  fi
}

# Function to create an inventory item
create_inventory() {
  echo "Creating Inventory Item..."
  inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "Paracetamol", "quantity": 100, "expirationDate": "2024-12-31"}' \
  http://localhost:5000/api/inventory)
  echo "Inventory Response: $inventory_response"
  handle_error "$inventory_response" "create_inventory"
  item_id=$(echo $inventory_response | jq -r '._id')
  if [ "$item_id" != "null" ]; then
    echo "Inventory item created with ID: $item_id"
  else
    echo "Failed to create inventory item."
    exit 1
  fi
}

# Function to create an order
create_order() {
  echo "Creating Order..."
  order_payload=$(jq -n \
    --arg userId "$user_id" \
    --arg itemId "$item_id" \
    '{"userId": $userId, "items": [{"itemId": $itemId, "quantity": 10}], "status": "Pending"}')
  echo "Order Payload: $order_payload"
  order_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$order_payload" \
  http://localhost:5000/api/orders)
  echo "Order Response: $order_response"
  handle_error "$order_response" "create_order"
  order_id=$(echo $order_response | jq -r '._id')
  if [ "$order_id" != "null" ]; then
    echo "Order created with ID: $order_id"
  else
    echo "Failed to create order."
    exit 1
  fi
}

# Function to create a supplier
create_supplier() {
  echo "Creating Supplier..."
  supplier_payload=$(jq -n \
    --arg itemId "$item_id" \
    '{"name": "Supplier Inc.", "contactInfo": "contact@supplier.com", "itemsSupplied": [{"itemId": $itemId}]}')
  echo "Supplier Payload: $supplier_payload"
  supplier_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$supplier_payload" \
  http://localhost:5000/api/suppliers)
  echo "Supplier Response: $supplier_response"
  handle_error "$supplier_response" "create_supplier"
  supplier_id=$(echo $supplier_response | jq -r '._id')
  if [ "$supplier_id" != "null" ]; then
    echo "Supplier created with ID: $supplier_id"
  else
    echo "Failed to create supplier."
    exit 1
  fi
}

# Function to create FDA data
create_fda_data() {
  echo "Creating FDA Data..."
  fda_data_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"drugName": "Ibuprofen", "shortageStatus": "Available", "details": "No shortage"}' \
  http://localhost:5000/api/fda)
  echo "FDA Data Response: $fda_data_response"
  handle_error "$fda_data_response" "create_fda_data"
  fda_data_id=$(echo $fda_data_response | jq -r '._id')
  if [ "$fda_data_id" != "null" ]; then
    echo "FDA data created with ID: $fda_data_id"
  else
    echo "Failed to create FDA data entry."
    exit 1
  fi
}

# Function to run tests with invalid data
run_invalid_tests() {
  echo "Running tests with invalid data..."

  # Invalid user creation
  invalid_user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "", "email": "invalid-email", "password": ""}' \
  http://localhost:5000/api/users)
  echo "Invalid User Response: $invalid_user_response"

  # Invalid inventory creation
  invalid_inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "", "quantity": -1, "expirationDate": "invalid-date"}' \
  http://localhost:5000/api/inventory)
  echo "Invalid Inventory Response: $invalid_inventory_response"

  # Invalid order creation
  invalid_order_payload=$(jq -n \
    --arg userId "invalid-id" \
    --arg itemId "invalid-id" \
    '{"userId": $userId, "items": [{"itemId": $itemId, "quantity": -10}], "status": ""}')
  invalid_order_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$invalid_order_payload" \
  http://localhost:5000/api/orders)
  echo "Invalid Order Response: $invalid_order_response"

  # Invalid supplier creation
  invalid_supplier_payload=$(jq -n \
    --arg itemId "invalid-id" \
    '{"name": "", "contactInfo": "invalid-email", "itemsSupplied": [{"itemId": $itemId}]}')
  invalid_supplier_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$invalid_supplier_payload" \
  http://localhost:5000/api/suppliers)
  echo "Invalid Supplier Response: $invalid_supplier_response"

  # Invalid FDA data creation
  invalid_fda_data_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"drugName": "", "shortageStatus": "", "details": ""}' \
  http://localhost:5000/api/fda)
  echo "Invalid FDA Data Response: $invalid_fda_data_response"
}

# Function to run tests with duplicate and overlapping data
run_duplicate_and_overlapping_tests() {
  echo "Running tests with duplicate and overlapping data..."

  # Duplicate user creation
  duplicate_user_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
  http://localhost:5000/api/users)
  echo "Duplicate User Response: $duplicate_user_response"

  # Overlapping inventory creation
  overlapping_inventory_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"itemName": "Paracetamol", "quantity": 100, "expirationDate": "2024-12-31"}' \
  http://localhost:5000/api/inventory)
  echo "Overlapping Inventory Response: $overlapping_inventory_response"

  # Large payload creation
  large_items=$(seq 1 10000 | jq -R '. | {"itemId": "66b2dd1fba1210bd63563905", "quantity": 10}' | jq -s .)
  large_payload=$(jq -n --arg userId "$user_id" --argjson items "$large_items" '{"userId": $userId, "items": $items, "status": "Pending"}')
  large_payload_response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "$large_payload" \
  http://localhost:5000/api/orders)
  echo "Large Payload Response: $large_payload_response"
}

# Main script execution
echo "Starting API tests..."

create_user
create_inventory

echo "Fetching User ID for order creation..."
user_id=$(curl -s -X GET http://localhost:5000/api/users | jq -r '.[0]._id')
echo "Fetched User ID: $user_id"

echo "Fetching Inventory ID for order creation..."
item_id=$(curl -s -X GET http://localhost:5000/api/inventory | jq -r '.[0]._id')
echo "Fetched Inventory ID: $item_id"

if [ "$user_id" != "" ] && [ "$item_id" != "" ]; then
  create_order
  create_supplier
  create_fda_data
else
  echo "Invalid selection. Exiting."
  exit 1
fi

run_invalid_tests
run_duplicate_and_overlapping_tests

echo "API tests completed."
