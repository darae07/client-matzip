import { LiHTMLAttributes } from "react";
import { WhiteRoundedCard } from "../card/styledCard";

interface Props extends LiHTMLAttributes<HTMLLIElement> {

}

export const ListItem = ({ children, ...props }: Props) => {
  return (
    <li {...props}>
      <WhiteRoundedCard>
        {children}
      </WhiteRoundedCard>
    </li>
  )
}