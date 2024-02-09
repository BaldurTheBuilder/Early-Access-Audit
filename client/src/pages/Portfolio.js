import React from "react";
import { useQuery } from "@apollo/client";

import ListedProjects from "../components/ListedProjects";
import { QUERY_PROJECTS } from "../api/queries";

function Portfolio() {
  const projectQuery = useQuery(QUERY_PROJECTS, {});
  const projects = projectQuery.data?.projects || {};

  return (
    <main>
      <div id="container">
        <div id="saved-tasks">
          {/* insert scrollable list component */}
          {projectQuery.loading ? (
            <div>Loading...</div>
          ) : (<ListedProjects projects={projects} />)}
        </div>
      </div>
    </main>
  );
}

export default Portfolio;