import React from "react";
import { LiHTMLAttributes } from "react";
import { WhiteRoundedCard } from "../card/styledCard";

interface Props extends LiHTMLAttributes<HTMLLIElement> {

}

export const ListItem = React.forwardRef(({ children, ...props }: Props, ref) => (
  <li {...props}>
    <WhiteRoundedCard>
      {children}
    </WhiteRoundedCard>
  </li>
))
