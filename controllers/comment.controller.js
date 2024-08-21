
async function getComments(req, res, next) {
  console.log('getComments');
  // const username = req.body.userName;
  // const password = req.body.userPassword;
  // const email = req.body.userEmail;
  // const phone = req.body.userPhone;

  // try {
  //   const signupAnswer = await sign.createUser(username, password, email, phone);

  //   if (signupAnswer == true) {
  //     return res.status(200).json({
  //       HTTP_status: 200,
  //       message: "User added",
  //     });
  //   } else if (signupAnswer == "ERROR: User with the same name or email already exists") {
  //     return res.status(400).json({
  //       HTTP_status: 400,
  //       message: "User with the same name or email already exists",
  //     });
  //   }
  // } catch (error) {
  //   console.error("Error occurred during signin:", error);
  //   return res.status(500).json({
  //     HTTP_status: 500,
  //     message: "Internal Server Error",
  //   });
  // }

  const fakeComments = [
    {
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      content: 'Это первый тестовый комментарий',
      createdAt: new Date().toISOString(),
      replies: [
        {
          id: 2,
          username: 'user2',
          email: 'user2@example.com',
          content: 'Это ответ на первый комментарий',
          createdAt: new Date().toISOString(),
          replies: [
            {
              id: 3,
              username: 'user3',
              email: 'user3@example.com',
              content: 'Это ответ на второй комментарий',
              createdAt: new Date().toISOString(),
              replies: [],
            }
          ],
        },
        {
          id: 4,
          username: 'user4',
          email: 'user4@example.com',
          content: 'Это еще один ответ на первый комментарий',
          createdAt: new Date().toISOString(),
          replies: [],
        }
      ],
    },
    {
      id: 5,
      username: 'user5',
      email: 'user5@example.com',
      content: 'Это второй заглавный комментарий',
      createdAt: new Date().toISOString(),
      replies: [],
    },
    {
      id: 6,
      username: 'user6',
      email: 'user6@example.com',
      content: 'Это третий заглавный комментарий',
      createdAt: new Date().toISOString(),
      replies: [
        {
          id: 7,
          username: 'user7',
          email: 'user7@example.com',
          content: 'Это ответ на третий комментарий',
          createdAt: new Date().toISOString(),
          replies: [],
        }
      ],
    }
  ];

  res.status(200).json({
    comments: fakeComments,
  });
};

module.exports = {
  getComments
};