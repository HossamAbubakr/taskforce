import styled from "styled-components";

interface DropdownMenuProps {
  $isopen: boolean;
  children: React.ReactNode;
}

function DropdownMenu({ $isopen, children }: DropdownMenuProps) {
  return (
    <DropdownMenuContainer $isopen={$isopen}>{children}</DropdownMenuContainer>
  );
}
const DropdownMenuContainer = styled.div<DropdownMenuProps>`
  display: ${({ $isopen }) => ($isopen ? "block" : "none")};
  position: absolute;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
  overflow: hidden;
  white-space: nowrap;
`;

export default DropdownMenu;
