import AppHeader from "./AppHeader";

const AppLayout = ({ children }: { children: any }) => {
  return (
    <div>
      <AppHeader />
      <div>{children}</div>
    </div>
  );
};
export default AppLayout;
