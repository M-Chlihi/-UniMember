import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPoll, createPollOption } from "../api/adminPolls.api";

import { adminPollKeys } from "./queryKeys";
export const useCreatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description, startsAt, endsAt, options }) => {
      const pollResponse = await createPoll({
        title,
        description,
        startsAt,
        endsAt,
      });

      const poll = pollResponse.data;

      const createdOptions = [];

      try {
        for (const option of options) {
          const optionResponse = await createPollOption(poll.id, option);

          createdOptions.push(optionResponse);
        }
      } catch (error) {
        error.pollId = poll.id;
        throw error;
      }

      return {
        poll,
        options: createdOptions,
      };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminPollKeys.lists(),
      });
    },
  });
};
// export const useCreatePoll = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload) => {
//       const { options, ...pollPayload } = payload;

//       //create the poll
//       const pollResponse = await createPoll(pollPayload);

//       const poll = pollResponse.data;

//       // create every option
//       for (const option of options) {
//         await createPollOption(poll.id, option);
//       }

//       return pollResponse;
//     },

//     onSuccess: (_data, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: adminPollKeys.lists(),
//       });
//     },
//   });
// };
