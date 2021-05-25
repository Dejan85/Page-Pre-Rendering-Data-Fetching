import React from "react";

const UserIdPage = (props) => {
  const { id } = props;
  return <div>{id}</div>;
};

export default UserIdPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: `userId-${userId}`,
    },
  };
}
