#!/bin/bash

BASE_URL="http://localhost:5000/api"

# Function to parse JSON and extract a value
extract_value() {
  local json="$1"
  local key="$2"
  echo "Extracting value for key: $key from JSON: $json"
  local value=$(echo "$json" | jq -r ".${key}" 2>/dev/null)
  if [ "$value" == "null" ] || [ -z "$value" ]; then
    echo "Failed to extract $key from JSON: $json"
    return 1
  fi
  echo "Extracted value: $value"
  echo "$value"
}

# Function to create a user
create_user() {
  echo "Creating User..."
  local data='{"name":"John Doe","email":"john@example.com","password":"password123","role":"user"}'
  echo "Sending data: $data"
  local response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL/users")
  echo "User Response: $response"
  local user_id=$(extract_value "$response" "_id")
  if [ -z "$user_id" ]; then
    echo "Failed to create User: $response"
    return 1
  fi
  echo "User created with ID: $user_id"
  echo "$user_id"
}

# Function to create an inventory item
create_inventory() {
  echo "Creating Inventory Item..."
  local data='{"itemName":"Paracetamol","quantity":100,"expirationDate":"2024-12-31"}'
  echo "Sending data: $data"
  local response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL/inventory")
  echo "Inventory Response: $response"
  local inventory_id=$(extract_value "$response" "_id")
  if [ -z "$inventory_id" ]; then
    echo "Failed to create Inventory Item: $response"
    return 1
  fi
  echo "Inventory item created with ID: $inventory_id"
  echo "$inventory_id"
}

# Function to create an order
create_order() {
  local user_id=$1
  local inventory_id=$2
  echo "Creating Order..."
  local data=$(jq -n --arg userId "$user_id" --arg itemId "$inventory_id" '{
    userId: $userId,
    items: [{ itemId: $itemId, quantity: 10 }],
    status: "Pending"
  }')
  echo "Order Payload: $data"
  local response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL/orders")
  echo "Order Response: $response"
  local order_id=$(extract_value "$response" "_id")
  if [ -z "$order_id" ]; then
    echo "Failed to create Order: $response"
    return 1
  fi
  echo "Order created with ID: $order_id"
  echo "$order_id"
}

# Function to create a supplier
create_supplier() {
  local inventory_id=$1
  echo "Creating Supplier..."
  local data=$(jq -n --arg itemId "$inventory_id" '{
    name: "Supplier Inc.",
    contactInfo: "contact@supplier.com",
    itemsSupplied: [{ itemId: $itemId }]
  }')
  echo "Supplier Payload: $data"
  local response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL/suppliers")
  echo "Supplier Response: $response"
  local supplier_id=$(extract_value "$response" "_id")
  if [ -z "$supplier_id" ]; then
    echo "Failed to create Supplier: $response"
    return 1
  fi
  echo "Supplier created with ID: $supplier_id"
  echo "$supplier_id"
}

# Function to create FDA data
create_fda_data() {
  echo "Creating FDA Data..."
  local data='{"drugName":"Ibuprofen","shortageStatus":"Available","details":"No shortage"}'
  echo "Sending data: $data"
  local response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL/fda")
  echo "FDA Data Response: $response"
  local fda_data_id=$(extract_value "$response" "_id")
  if [ -z "$fda_data_id" ]; then
    echo "Failed to create FDA Data: $response"
    return 1
  fi
  echo "FDA data created with ID: $fda_data_id"
  echo "$fda_data_id"
}

# Main script execution
user_id=$(create_user)
if [ -z "$user_id" ]; then
  echo "User creation failed. Exiting."
  exit 1
fi

inventory_id=$(create_inventory)
if [ -z "$inventory_id" ]; then
  echo "Inventory item creation failed. Exiting."
  exit 1
fi

order_id=$(create_order "$user_id" "$inventory_id")
if [ -z "$order_id" ]; then
  echo "Order creation failed. Exiting."
  exit 1
fi

supplier_id=$(create_supplier "$inventory_id")
if [ -z "$supplier_id" ]; then
  echo "Supplier creation failed. Exiting."
  exit 1
fi

fda_data_id=$(create_fda_data)
if [ -z "$fda_data_id" ]; then
  echo "FDA data creation failed. Exiting."
  exit 1
fi

echo "All tests with valid data completed successfully."
