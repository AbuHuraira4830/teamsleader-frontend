import React, { useEffect, useRef } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoPersonCircle, IoPersonAddOutline, IoClose } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

const AddNewPerson = ({
  onPopoverOpen,
  onAddPerson,
  selectedPersons,
  onRemovePerson,
}) => {
  const inputRef = useRef(null);
  const defaultPeople = [
    {
      name: "Usman Yousaf",
      email: "usman@gmail.com",
      hasCustomAvatar: true,
      avatar: (
        <span className="calendar-avatar text-[0.8rem] rounded-circle align-self-center px-[0.3rem] py-[0.2rem] border-0 me-2">
          UY
        </span>
      ),
    },
    {
      name: "falak@gmail.com",
      email: "falak@gmail.com",
      hasCustomAvatar: false,
      avatar: <IoPersonCircle className="text-[1.8rem] me-2" />,
    },
  ];

  const handleAddPerson = (person) => {
    // Callback to add a person to the main div
    onAddPerson(person);
  };

  useEffect(() => {
    if (onPopoverOpen) {
      inputRef.current.focus();
    }
  }, [onPopoverOpen]);
  // const filteredSuggestedPeople = suggestedPeople.filter(
  //   (person) =>
  //     !selectedPersons.find(
  //       (selectedPerson) => selectedPerson.email === person.email
  //     )
  // );
  const filteredSuggestedPeople = defaultPeople.filter(
    (person) =>
      !selectedPersons.some(
        (selectedPerson) => selectedPerson.name === person.name
      )
  );

  return (
    <>
      <div className="add_person_wrapper">
        <div className="multiple_persons_box ">
          {selectedPersons.map((person, index) => (
            <div
              key={index}
              className="mx-2 flex items-center mt-2 py-1 bg-[#E5F4FF] rounded-[24px] cursor-pointer"
            >
              {person.avatar}
              <span className="mx-1 text-[12px] text-nowrap">
                {person.name}
              </span>
              <IoClose
                className="text-[1.2rem] mr-[4px] py-1 cursor-pointer hover:bg-[#fff] rounded-[50%] transition-all duration-300"
                onClick={() => onRemovePerson(index)}
              />
            </div>
          ))}
        </div>

        <div className="addPersonSearch flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search names, roles, or teams relative"
            className={`person_searchInput`}
          />
          <RxMagnifyingGlass className="text-base text-[#c3c6d4] absolute right-8" />
        </div>

        <div className="text-[.8rem] ml-[.5rem] mt-[.5rem] mb-[1rem]">
          Suggested People
        </div>

        {filteredSuggestedPeople.map((person, index) => (
          <div
            key={index}
            onClick={() => handleAddPerson(person)}
            className={`flex justify-content-between mt-2 px-3 py-2 cursor-pointer hover:bg-[#dcdfec] transition-all duration-300`}
          >
            <span>
              {person.hasCustomAvatar && (
                <>
                  <span>{person.avatar}</span>
                  {person.name}
                </>
              )}
              {!person.hasCustomAvatar && (
                <span className="flex items-center">
                  {person.avatar}
                  {person.name}
                </span>
              )}
            </span>
          </div>
        ))}

        <div
          onClick={() =>
            handleAddPerson({
              name: "New Member",
              avatar: <RxAvatar className="text-[1rem] me-3 ml-1 mb-[.1rem]" />,
              email: "",
            })
          }
          className="flex justify-content-between mt-2 px-3 py-2 text-[.8rem] cursor-pointer hover:bg-[#dcdfec] transition-all duration-300"
        >
          <span className="flex items-center">
            <RxAvatar className="text-[1rem] me-3 ml-1 mb-[.1rem]" />
            Invite a new member by email
          </span>
        </div>
      </div>
    </>
  );
};

export default AddNewPerson;
