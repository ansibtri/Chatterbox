import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Layout from "../../../components/Layout/Layout";
export const howYouUseAppList = [{title: "Edit Profile",link: "/accounts/edit",},{title: "Notifications",link: "/accounts/notifications",},];
export const whoCanSeeYourContentList = [{title: "Account Privacy",link:'/accounts/privacy'},{title:"Close Friends",link: '/accounts/closefriends'},{title: "Blocked",link: "/accounts/blocked_accounts"}];
export const howOthersCanInteractWithYouList = [{title:'Messages Replies',link: '/accounts/message_replies'},{title: "Tags and mentions",link :'/accounts/tags_and_mentions'},{title: 'Comments',link: "/accounts/comments"},{title: "Sharing and reuse",link: "/accounts/sharing_and_reuse"},{title:"Restricted Accounts",link: "/accounts/restricted_accounts"},{title: "Hidden Words",link: "/accounts/hidden_words"}]
export const whatYouSeeList = [{title: "Muted Accounts",link: "/accounts/muted_accounts",},{title:"Content Preferences",link: "/accounts/content_preferences"},{title:"Like and Share Counts",link: "/accounts/like_and_share_counts"},{title:"Subscriptions",link: "/accounts/subscriptions"}]
export const yourAppAndMediaList = [{title:"Archiving and Downloading",link: "/accounts/archiving_and_downloading"},{title:"Language",link:"/accounts/language"},{title:"Website Permissions",link:"/accounts/website_permissions"}]
export const forFamiliesList = [{title:"Family Center", link:"/accounts/family_center"}]
export const forProfessionalsList=[{title:"Account type and tools",link:"/accounts/account_type_and_tools"},{title:"Account Verification",link:"/accounts/account_verification"}]
export const moreInfoAndSupportList =[{title:"Help",link:"/accounts/help"},{title:"Privacy Center",link:"/accounts/privacy_center"},{title:"Account Status",link:"/accounts/account_status"}]

export const Route = createFileRoute("/(app)/accounts/_layout")({
  component: RouteComponent,
  notFoundComponent:()=><h1>Not Found</h1>
});

// list
function RouteComponent() {
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  return (
    <div>
      <Layout>
        <div className="flex overflow-hidden">
          <div className="bg-gray-900 px-4 w-[400px] h-dvh [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-y-scroll ">

            {/* How you use app  */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                How you use {APP_NAME}
              </p>
              <ul>
                {Array.from(howYouUseAppList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Who can see your content  */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                How you use {APP_NAME}
              </p>
              <ul>
                {Array.from(whoCanSeeYourContentList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* How others can Interact with you  */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                How others can interact with you
              </p>
              <ul>
                {Array.from(howOthersCanInteractWithYouList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* What you see  */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                What you see
              </p>
              <ul>
                {Array.from(whatYouSeeList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Your app and media */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                Your app and media
              </p>
              <ul>
                {Array.from(yourAppAndMediaList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* For Families  */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                For Families
              </p>
              <ul>
                {Array.from(forFamiliesList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* For Professionals */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                For Professionals
              </p>
              <ul>
                {Array.from(forProfessionalsList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* More Info and support  */}
            <div className="px-3 my-3">
              <p className="text-gray-400 font-bold text-sm py-3">
                More Info and support
              </p>
              <ul>
                {Array.from(moreInfoAndSupportList).map((item, key) => {
                  return (
                    <li className=" w-full" key={key}>
                      <Link
                        to={item.link}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-gray-600" }}
                        className="py-3 flex justify-start items-center hover:bg-gray-500 px-3 rounded-md text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
            <Outlet />
        </div>
      </Layout>
    </div>
  );
}
