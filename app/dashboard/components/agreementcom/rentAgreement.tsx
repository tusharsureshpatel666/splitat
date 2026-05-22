"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const RentAgreement = ({ id }) => {
  const { data: session } = useSession();

  useEffect(() => {
    const Agreement = async () => {
      if (!id) {
        console.log("id is not found");
        return;
      }

      const res = await axios.get(`/api/agreement/${id}`);
      console.log(res);
    };

    Agreement();
  }, [id]);

  return (
    <div className="w-full border px-8 py-10 rounded-md min-h-screen text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="flex justify-center items-center flex-col mb-8">
        <h1 className="text-4xl font-bold text-center">RENT AGREEMENT</h1>
        <span className="text-xl mt-2">MONTH-TO-MONTH</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 leading-7">
       

        <p>
          This Rental Agreement is made on the date of{" "}
          <span className="border-b px-8"></span>
          between:
        </p>

        <p>
          <strong>Landlord / Store Owner:</strong>{" "}
          <span className="border-b px-24"></span>
        </p>

        <p className="font-semibold">AND</p>

        <p>
          <strong>Tenant 1:</strong> <span className="border-b px-24"></span>
        </p>

        <p>
          <strong>Tenant 2:</strong> <span className="border-b px-24"></span>
        </p>

        <p>
          For the commercial premises located at:
          <span className="border-b block mt-2 w-full"></span>
        </p>

        {/* Section 1 */}
        <div>
          <h3 className="font-semibold text-lg">1. Rental Arrangement</h3>
          <p>
            The landlord agrees to allow Tenant 1 and Tenant 2 to use and share
            the above-mentioned store space for business purposes.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-semibold text-lg">2. Term</h3>
          <p>
            This agreement is a month-to-month rental agreement. Either party
            may terminate the agreement by giving 30 days written notice to the
            other parties.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-semibold text-lg">3. Monthly Rent</h3>
          <p>
            The total monthly rent for the store shall be ₹
            <span className="border-b px-16"></span> per month.
          </p>

          <p>
            Tenant 1 shall pay ₹ <span className="border-b px-16"></span> per
            month.
          </p>

          <p>
            Tenant 2 shall pay ₹ <span className="border-b px-16"></span> per
            month.
          </p>

          <p>
            Rent must be paid to the landlord on or before the
            <span className="border-b px-10"></span> day of each month.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h3 className="font-semibold text-lg">4. Store Sharing</h3>
          <p>
            Tenant 1 and Tenant 2 agree to share the store space peacefully and
            responsibly. Both tenants must ensure that their business activities
            do not disturb each other or violate any local laws.
          </p>

          <p>
            The division of space or operating arrangement inside the store will
            be mutually decided between the tenants.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h3 className="font-semibold text-lg">5. Use of Premises</h3>
          <p>
            The store shall be used only for legal commercial purposes. Illegal
            activities or activities that damage the property are strictly
            prohibited.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h3 className="font-semibold text-lg">6. Maintenance</h3>
          <p>
            The tenants agree to maintain the cleanliness and good condition of
            the store. Any damage caused by the tenants must be repaired at
            their own cost.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h3 className="font-semibold text-lg">7. Utilities</h3>
          <p>
            Utility expenses such as electricity, water, internet, or other
            services shall be shared between the tenants unless otherwise
            agreed.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h3 className="font-semibold text-lg">8. Changes to Agreement</h3>
          <p>
            Any changes to this agreement must be made in writing and signed by
            the landlord and both tenants.
          </p>
        </div>

        {/* Section 9 */}
        <div>
          <h3 className="font-semibold text-lg">9. Agreement Acceptance</h3>
          <p>
            By signing below, the landlord and tenants agree to the terms and
            conditions of this month-to-month store sharing agreement.
          </p>
        </div>

        {/* Signatures */}
        <div className="pt-10 space-y-8">
          <div>
            <p>
              <strong>Landlord Signature:</strong> __________________________
            </p>
            <p>Name: __________________________</p>
            <p>Date: __________________________</p>
          </div>

          <div>
            <p>
              <strong>Tenant 1 Signature:</strong> __________________________
            </p>
            <p>Name: __________________________</p>
            <p>Date: __________________________</p>
          </div>

          <div>
            <p>
              <strong>Tenant 2 Signature:</strong> __________________________
            </p>
            <p>Name: __________________________</p>
            <p>Date: __________________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentAgreement;
