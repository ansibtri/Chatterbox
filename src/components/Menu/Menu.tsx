import { Link, useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../lib/Provider/AuthContext";
import { logout } from "../../lib/axios/auth";
const list = [
  {
    title: "Settings",
    link: "/settings",
  },
  {
    title: "Your Activity",
    link: "/your_activity",
  },
  {
    title: "Report Problem",
    link: "/report",
  },
  {
    title: "Accounts",
    link: "/accounts/edit",
  },
  {
    title: "Logout",
    fn: (logout: () => void) => {
      logout();
    },
  },
];
const Menu = () => {
  const router = useRouter();
  const { setUserAuth }: any = useAuth();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUserAuth({
        isAuthenticated: false,
        authToken: null,
        user: null,
      });
      router.invalidate();
    },
  });

  return (
    <div className="px-2">
      {/* Menu Header Starts Here  */}
      <div className="pb-4">
        <h6 className="text-white/80 px-3 font-bold text-lg">Menu</h6>
      </div>
      {/* Menu Headers Ends Here  */}
      {/* ---------------------------------------------------------------------------------------------------- */}
      {/* List section starts here */}
      <ul className="px-2">
        {list.map((item, key) => (
          <li
            key={key}
            className={`flex justify-start items-center ${
              key !== list.length - 1 ? "border-b-1 border-white/45" : null
            }`}
          >
            {item.link ? (
              <Link
                to={item.link}
                className="text-white/80 text-lg w-full py-4 px-2"
              >
                {item.title}
              </Link>
            ) : (
              <button
                className="text-white/80 text-lg px-2 w-full text-left py-4 cursor-pointer"
                onClick={() =>
                  item.fn && item.fn(() => mutate())
                }
              >
                {item.title}
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* List section ends here  */}
    </div>
  );
};

export default Menu;
