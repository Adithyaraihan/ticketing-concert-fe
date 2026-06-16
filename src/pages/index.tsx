import Image from "next/image";
import { Inter } from "next/font/google";
import {Button} from "@heroui/react";
import Envelope from "@gravity-ui/icons/Envelope";
import Globe from "@gravity-ui/icons/Globe";
import Plus from "@gravity-ui/icons/Plus";
import TrashBin from "@gravity-ui/icons/TrashBin";
import PageHead from "@/components/commons/pageHead";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 return (
   <div className="flex flex-wrap gap-3">
     <PageHead title="Ticketing Concert"/>
     <Button>
       <Globe />
       Search
     </Button>
     <Button variant="secondary">
       <Plus />
       Add Member
      </Button>
      <Button variant="tertiary">
        <Envelope />
        Email
      </Button>
      <Button variant="danger">
        <TrashBin />
        Delete
      </Button>
    </div>
  );
}
