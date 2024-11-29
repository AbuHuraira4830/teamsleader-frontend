import React, { useEffect, useState } from 'react';
import { Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { useStateContext } from '../../../../contexts/ContextProvider';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userEmail} = useStateContext();


  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`https://miketeamsleaderbackend-a03d0e00169c.herokuapp.com/invoices/${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          setInvoices(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch invoices.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [userEmail]);

  return (
    <div className="p-6 bg-white ">
      {/* <h2 className="text-2xl font-bold mb-6">Invoice Management</h2> */}
      {loading ? (
        <p>Loading invoices...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : invoices.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="bg-gray-100">
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Amount</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.number || invoice.id}</td>
                <td>{new Date(invoice.created * 1000).toLocaleDateString()}</td>
                <td>€{(invoice.total / 100).toFixed(2)}</td>
                <td>
                  <div className="flex justify-center space-x-4">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                      <Button variant="link" onClick={() => window.open(invoice.hosted_invoice_url, '_blank')}>
                        <FaEye className="text-[#00854d] hover:text-opacity-80 text-sm" />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
                      <Button variant="link" onClick={() => window.open(invoice.invoice_pdf, '_blank')}>
                        <FaDownload className="text-[#00854d] hover:text-opacity-80 text-sm" />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                      <Button variant="link" onClick={() => console.log(`Delete action for ${invoice.id}`)}>
                        <FaTrashAlt className="text-[#00854d] hover:text-opacity-80 text-sm" />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default InvoiceManagement;
