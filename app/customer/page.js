"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function CustomerPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [customerList, setCustomerList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Fetch all customers
  async function fetchCustomers() {
    try {
      const response = await fetch(`${API_BASE}/customer`);
      if (response.ok) {
        const customers = await response.json();
        setCustomerList(customers);
      } else {
        console.error("Error fetching customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Create a new customer
  async function createCustomer(data) {
    try {
      const response = await fetch(`${API_BASE}/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchCustomers();
        reset(); // Reset form after submission
      } else {
        console.error("Error creating customer");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  }

  // Delete a customer
  async function deleteCustomer(customerId) {
    try {
      const response = await fetch(`${API_BASE}/customer`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: customerId }),
      });
      if (response.ok) {
        fetchCustomers(); // Refresh the customer list after deletion
      } else {
        console.error("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }

  // Open the edit modal
  function openEditModal(customer) {
    setSelectedCustomer(customer);
    setValue("name", customer.name);
    setValue("dateOfBirth", customer.dateOfBirth);
    setValue("memberNumber", customer.memberNumber);
    setValue("interests", customer.interests);
    setIsModalOpen(true);
  }

  // Update a customer
  async function updateCustomer(data) {
    try {
      const response = await fetch(`${API_BASE}/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: selectedCustomer._id }),
      });
      if (response.ok) {
        fetchCustomers();
        setIsModalOpen(false);
        reset(); // Reset form after submission
      } else {
        console.error("Error updating customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit(createCustomer)}>
        <div className="grid grid-cols-2 gap-4 w-fit m-4">
          <div>Name:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>Date of Birth:</div>
          <div>
            <input
              name="dateOfBirth"
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>Member Number:</div>
          <div>
            <input
              name="memberNumber"
              type="number"
              {...register("memberNumber", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>Interests:</div>
          <div>
            <input
              name="interests"
              type="text"
              {...register("interests")}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="col-span-2">
            <input
              type="submit"
              value="Add Customer"
              className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            />
          </div>
        </div>
      </form>
      <div>
        <h1>Customers ({customerList.length})</h1>
        {customerList.map((customer) => (
          <div key={customer._id} className="flex items-center space-x-4 my-2">
            <Link href={`/customer/${customer._id}`} className="text-red-600">
              {customer.name} (Member {customer.memberNumber})
            </Link>
            <button
              onClick={() => openEditModal(customer)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCustomer(customer._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4">Edit Customer</h2>
            <form onSubmit={handleSubmit(updateCustomer)}>
              <div className="grid grid-cols-2 gap-4 w-fit m-4">
                <div>Name:</div>
                <div>
                  <input
                    name="name"
                    type="text"
                    {...register("name", { required: true })}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div>Date of Birth:</div>
                <div>
                  <input
                    name="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth", { required: true })}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div>Member Number:</div>
                <div>
                  <input
                    name="memberNumber"
                    type="number"
                    {...register("memberNumber", { required: true })}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div>Interests:</div>
                <div>
                  <input
                    name="interests"
                    type="text"
                    {...register("interests")}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="submit"
                    value="Update Customer"
                    className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                </div>
              </div>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}