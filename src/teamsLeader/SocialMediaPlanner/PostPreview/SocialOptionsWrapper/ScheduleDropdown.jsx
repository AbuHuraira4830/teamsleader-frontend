// ScheduleDropdown.js
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ScheduleDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whenToPost, setWhenToPost] = useState("Specific Days & Times");
  const [scheduledDate, setScheduledDate] = useState("2024-05-10");
  const [scheduledHour, setScheduledHour] = useState("12");
  const [scheduledMinute, setScheduledMinute] = useState("00");
  const [scheduledAMPM, setScheduledAMPM] = useState("am");

  const whenToPostOptions = ["Specific Days & Times", "Immediately"];

  const handleWhenToPostChange = (event) => {
    setWhenToPost(event.target.value);
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-gray-700 text-sm font-medium"
      >
        <span>When to post</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">
          {/* When to Post Dropdown */}
          <Form.Group controlId="whenToPost">
            <Form.Label className="text-sm text-[#364141] font-medium">
              When to post
            </Form.Label>
            <Form.Control
              as="select"
              value={whenToPost}
              onChange={handleWhenToPostChange}
              className="text-sm shadow-none focus:border-[#00854d]"
            >
              {whenToPostOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Date and Time Selection */}
          <Row>
            {/* Date Picker */}
            <Col>
              <Form.Group controlId="scheduledDate">
                <Form.Label className="text-sm text-[#364141] font-medium">
                  Date
                </Form.Label>
                <Form.Control
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="text-sm shadow-none focus:border-[#00854d]"
                />
              </Form.Group>
            </Col>

            {/* Time Picker */}
            <Col>
              <Form.Label className="text-sm text-[#364141] font-medium">
                Time
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  as="select"
                  value={scheduledHour}
                  onChange={(e) => setScheduledHour(e.target.value)}
                  className="me-1 text-sm shadow-none focus:border-[#00854d]"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option key={hour}>{hour}</option>
                  ))}
                </Form.Control>

                <Form.Control
                  as="select"
                  value={scheduledMinute}
                  onChange={(e) => setScheduledMinute(e.target.value)}
                  className="me-1 text-sm shadow-none focus:border-[#00854d]"
                >
                  {["00", "15", "30", "45"].map((minute) => (
                    <option key={minute}>{minute}</option>
                  ))}
                </Form.Control>

                <Form.Control
                  as="select"
                  value={scheduledAMPM}
                  onChange={(e) => setScheduledAMPM(e.target.value)}
                  className="text-sm shadow-none focus:border-[#00854d]"
                >
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </Form.Control>
              </div>
              <div className="mt-2 text-center">
                <a href="#" className="text-sm text-primary underline">
                  Use Optimal Times
                </a>
              </div>
            </Col>

            <Col md="auto">
              <a href="#" className="text-sm text-primary underline">
                Use Optimal Times
              </a>
            </Col>
          </Row>

          {/* Links for Additional Scheduling */}

          <a href="#" className="text-sm text-primary underline">
            Advanced Scheduling
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDropdown;
