import Customer from "@/models/Customer"; // Adjusted for relative path

// GET all customers, sorted by memberNumber in descending order
export async function GET() {
  try {
    const customers = await Customer.find().sort({ memberNumber: -1 });
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: "Error fetching customers" }), { status: 500 });
  }
}

// POST a new customer
export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body); // Log the request body for debugging
    const customer = new Customer(body);
    await customer.save();
    return new Response(JSON.stringify(customer), { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error); // Log the error for debugging
    return new Response(JSON.stringify({ message: "Error creating customer", error: error.message }), { status: 500 });
  }
}

// PUT to update an existing customer by ID
export async function PUT(request) {
  try {
    const body = await request.json();
    const customer = await Customer.findByIdAndUpdate(body._id, body, { new: true });
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: "Error updating customer" }), { status: 500 });
  }
}

// DELETE a customer by ID
export async function DELETE(request) {
  try {
    const body = await request.json();
    const customer = await Customer.findByIdAndDelete(body._id);

    if (!customer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Customer deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: "Error deleting customer" }), { status: 500 });
  }
}