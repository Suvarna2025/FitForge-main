
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import AddNewSlotsForm from "../AddNewSlotsForm/AddNewSlotsForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddNewSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trainer , setTrainer] = useState({})

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const res = await axiosSecure.get(`/specific-trainer/${user.email}`);
          setTrainer(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      console.log("User is not authenticated or email is missing");
    }
  }, [user]);

  console.log(trainer)


  return (
  <div>
    <AddNewSlotsForm key={trainer._id} trainer={trainer} />
  </div>
  );
};

export default AddNewSlots;
