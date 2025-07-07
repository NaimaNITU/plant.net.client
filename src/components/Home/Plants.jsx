import Card from "./Card";
import Container from "../Shared/Container";
import { useLoaderData } from "react-router";
import EmptyState from "../Shared/EmptyState";
import { useState } from "react";

const Plants = () => {
  const addingPlantsData = useLoaderData();
  const [plants, setPlants] = useState(addingPlantsData);

  return (
    <>
      {plants.length === 0 ? (
        <EmptyState message={"No Plants Found, Please Add Plants."} />
      ) : (
        <Container>
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {plants.map((plant) => (
              <Card key={plant._id} plant={plant} setPlants={setPlants} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Plants;
