import React, { useState } from "react";
import { useSelector } from "react-redux"; // Make sure you're using Redux's useSelector hook
import { useParams } from "react-router-dom";

import Nav from "../components/nav";
import BookDetails from "../BookDetailsComponts/BookDetails";
import CustomsReviews from "../BookDetailsComponts/CustomsReviews";
import BookComments from "../BookDetailsComponts/BookComments";
import SubmitRev from "../BookDetailsComponts/SubmitRevwier";

const BookDetailsPage = () => {
  const [noteMoyenne, setNoteMoyenne] = useState(null);

  const user = useSelector((state) => state.auth.userInfo); // ✅ Accessing userInfo
  const { id: bookId } = useParams(); // ✅ get bookId from URL params

  return (
    <div>
      <Nav />
      <BookDetails setNoteMoyenne={setNoteMoyenne} />

      <div className="flex justify-around">
       

        <div className="grid gap-10 ml-20">
           <h1 className="text-[32px] font-extrabold leading-[100%] mt-10 tracking-[0px] ml-20 text-black font-zain mb-4">
          Customer Reviews
        </h1>
          <CustomsReviews noteMoyenne={noteMoyenne} />
          <BookComments />
        </div>

        <SubmitRev user={user} bookId={bookId} /> 
      </div>
    </div>
  );
};

export default BookDetailsPage;
