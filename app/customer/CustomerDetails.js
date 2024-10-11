import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id);
    }
  }, [id]);

  async function fetchCustomerDetails(customerId) {
    try {
      const response = await fetch(`/customer/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      } else {
        console.error('Customer not found');
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>{customer.name}</h1>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Date of Birth: {customer.dateOfBirth}</p>
      <p>Interests: {customer.interests}</p>
    </main>
  );
}