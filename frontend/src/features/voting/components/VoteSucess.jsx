// import { useNavigate } from "react-router-dom";

// import Card from "../../../components/ui/Card";
// import Badge from "../../../components/ui/Badge";
// import Button from "../../../components/ui/Button";

// export default function VoteSuccess({ poll, vote }) {
//   const navigate = useNavigate();

//   return (
//     <div className="mx-auto max-w-2xl">
//       <Card>
//         <div className="text-center">
//           <Badge variant="success">Vote recorded</Badge>

//           <h1 className="mt-4 text-3xl font-bold">
//             Your vote has been submitted
//           </h1>

//           <p className="mt-3 text-text-secondary">You selected:</p>

//           <p className="mt-2 text-xl font-semibold text-text-primary">
//             {vote.optionTitle}
//           </p>

//           <div className="mt-6 flex justify-center gap-3">
//             <Button onClick={() => navigate("/member")}>
//               Back to dashboard
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
