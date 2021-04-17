import { Friends, Aliens } from "./dbConnectors";

export const resolvers = {
  Query: {
    getFriend: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Friends.findById(id, (error, friend) => {
          if (error) reject(error);
          else resolve(friend);
        });
      });
    },
    getAlien: (root, { id }) => {
      return Aliens.findOne({ where: { id } })
        .then(result => result)
        .catch(error => error);
    },
    getAliens: root => {
      return Aliens.findAll()
    }
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        email: input.email,
      });

      newFriend.id = newFriend._id;

      return new Promise((resolve, reject) => {
        newFriend.save((error) => {
          if (error) reject(error);
          else resolve(newFriend);
        });
      });
    },
    updateFriend: (root, { input }) => {
      return new Promise((resolve, reject) => {
        Friends.findByIdAndUpdate(
          input.id,
          input,
          { new: true, upsert: true },
          (error, friend) => {
            if (error) reject(error);
            else resolve(friend);
          }
        );
      });
    },
    deleteFriend: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Friends.deleteOne({ _id: id}, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })
    }
  },
};
