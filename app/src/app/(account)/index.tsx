import {ArrowUpRight, ChevronRight} from "lucide-react-native";
import React from "react";
import {ScrollView} from "react-native";

import {Body} from "@/elements/components/body";
import {Group} from "@/elements/components/group";
import {GroupButton} from "@/elements/components/group-button";
import {GroupLine} from "@/elements/components/group-line";
import {Title} from "@/elements/components/title";
import {Button} from "@/elements/primitives/button";
import useAccount from "@/elements/stores/useAccount";

export default function Page() {
  const name = useAccount((state) => {
    return state.user.name;
  });

  const id = useAccount((state) => {
    return state.user.id;
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      showsVerticalScrollIndicator={false}
    >
      <Body>
        <Group>
          <GroupButton
            label="Name"
            value={name}
            icon={<ChevronRight size={22} color="white" />}
          />
          <GroupButton
            label="Language"
            value="English"
            icon={<ChevronRight size={22} color="white" />}
          />

          <GroupLine />

          <GroupButton
            label="Profile"
            value="Local"
            icon={<ChevronRight size={22} color="white" />}
          />
        </Group>

        <Title>Application</Title>

        <Group>
          <GroupButton label="Player ID" value={id} />
          <GroupButton label="Version" value="1.43.0" />
        </Group>

        <Button variant="secondary" size="large" scaling={1.05}>
          UPDATE APPLICATION
        </Button>

        <Title>Policies</Title>

        <Group>
          <GroupButton
            label="Terms of Use"
            icon={<ArrowUpRight size={22} color="white" />}
          />
          <GroupButton
            label="Privacy Policy"
            icon={<ArrowUpRight size={22} color="white" />}
          />
        </Group>
      </Body>
    </ScrollView>
  );
}
