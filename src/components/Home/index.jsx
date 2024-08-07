import React, { useState } from "react";
import { FileUploader, Form } from "@components/FormControls";
import { Button } from "@components/UI";
import { clientBaseURL, clientEndPoints } from "@/config";
import toast from "react-hot-toast";
import useTypingEffect from "@hook"; // Adjust the import path as necessary

const Home = () => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [currentResponseType, setCurrentResponseType] = useState(null);

  const typedSummary = useTypingEffect(response?.summary, 20);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (document) {
      formData.append("file", document.file);
    }

    try {
      setResponse(null);
      setCurrentResponseType(null);
      const response = await clientBaseURL.post(
        `${clientEndPoints?.uploadDoc}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response in home :", response);
      if (response.status >= 200 && response.status < 300) {
        toast.success("File Uploaded Successfully");
        setSuccessMessage("Your document has been uploaded successfully.");
        setDocument(null);
        setResponse(response.data); // Store the response data
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    if (currentResponseType === "summary") {
      return (
        <div className="bg-white rounded-md border-2 border-dashed border-blue-600 shadow-md p-4 mt-6 w-full">
          <p className="text-center text-xl font-bold mb-2 text-blue-600">
            Summary of Document
          </p>
          <pre className="overflow-auto whitespace-pre-wrap text-lg text-gray-800 leading-6">
            {typedSummary}
          </pre>
        </div>
      );
    }

    if (currentResponseType === "entity_extraction") {
      return (
        <div className="bg-white rounded-md border-2 border-dashed border-blue-600 shadow-md p-4 mt-6 w-full">
          <p className="text-center text-xl font-bold mb-2 text-blue-600">
            Entities Extracted from Document.
          </p>
          <pre className="overflow-auto whitespace-pre-wrap text-lg text-gray-800 leading-6">
            {response?.entities.join("\n")}
          </pre>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-2xl text-blue-600 mb-6">
        Welcome to Smart Document Analyzer
      </h1>
      <p className="text-lg text-center text-gray-800 font-semibold mb-6">
        Unlock the power of your documents with our intelligent analyzer.
        Extract key information, gain insights, and streamline your workflow
        effortlessly. Get started now and transform the way you handle
        documents!
      </p>
      <Form onSubmit={handleSubmit} className="mb-6">
        <FileUploader
          className="w-full mb-6"
          fileTypes={[
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]}
          file={document}
          setFile={setDocument}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 py-1"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </Form>
      {successMessage && (
        <div className="text-center mt-6">
          <p className="text-lg text-green-600 font-semibold">
            {successMessage}
          </p>
          <p className="text-gray-800 font-medium text-lg">Now you can</p>
          <ul className="text-center mb-4 text-gray-800 text-base font-semibold">
            <li>Generate Summery of document.</li>
            <li>Extract Entities of the document.</li>
          </ul>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                setCurrentResponseType("summary");
                setResponse(response); // Ensure response state is passed to useTypingEffect
              }}
              className="text-white px-4 py-1"
            >
              Generate Summary
            </Button>
            <Button
              onClick={() => setCurrentResponseType("entity_extraction")}
              className="text-white px-4 py-1"
            >
              Extract Entities
            </Button>
          </div>
        </div>
      )}
      {renderResponse()}
    </div>
  );
};

export default Home;
