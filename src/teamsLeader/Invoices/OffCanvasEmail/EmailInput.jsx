import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMinusCircle } from "react-icons/ai";

const EmailInput = ({ emails, setEmails, placeholder }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input) {
      setEmails([...emails, input]);
      setInput("");
    }
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-1 flex flex-wrap items-center border border-gray-300 rounded-md p-2">
      {emails.map((email, index) => (
        <div
          key={index}
          className=" flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 m-1"
        >
          {email}
          <AiOutlineMinusCircle
            className="cursor-pointer"
            onClick={() => removeEmail(index)}
          />
        </div>
      ))}
      <input
        className=" flex-1 min-w-0 bg-transparent p-1 focus:outline-none "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={emails.length === 0 ? placeholder : ""}
      />
    </div>
  );
};

export default EmailInput;
