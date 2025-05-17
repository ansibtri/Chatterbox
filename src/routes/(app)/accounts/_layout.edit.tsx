import { formOptions } from "@tanstack/react-form";
import { createFileRoute,Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/accounts/_layout/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  // get context
  const context = Route.useRouteContext();
  
  // API URL for photos located in server
  const PHOTO_API_URL = import.meta.env.VITE_SERVER_PUBLIC_API_URL;

  // get app name
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  return (
    <div className="bg-gray-900 w-full block overflow-hidden">
      <div className="overflow-y-scroll h-dvh">
        <form>
          {/* change profile picture  */}
          <div className="mx-23 ">
            <h4 className="text-2xl font-bold text-white py-4 mt-12">
              Edit Profile
            </h4>
            <div className="flex justify-between items-center py-3 bg-gray-700 px-6 rounded-xl">
              <div className="flex justify-center items-center gap-4">
                <div className="w-[70px] rounded-full overflow-hidden">
                  <img src={PHOTO_API_URL + context.user.profilePic} />
                </div>
                <div>
                  <p className="text-white font-bold">
                    {context.user.username}
                  </p>
                  <p className="text-white/45">
                    {context.user.firstname + " " + context.user.lastname}
                  </p>
                </div>
              </div>
              <label className="bg-blue-700 text-white cursor-pointer px-3 py-2 rounded-lg">
                Change Photo
                <input type="file" hidden />
              </label>
            </div>
          </div>

          {/* Portfolio  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">
              Username
            </h4>
            <div className="border-gray-700 border-1 rounded-xl flex justify-start overflow-clip">
              <p className="text-white/50 px-3 bg-gray-800 py-3">
                {APP_NAME}
              </p>
            <input
              className="w-full py-3 outline-none px-1 rounded-xl text-white/50"
              value={
                "@"+context?.user?.username || "@username"
              }
            />
            {context?.user?.socialMedia?.portfolio && <Link className="px-6 bg-gray-800 py-3 text-white/50" target="_blank" to={`https://${context?.user?.socialMedia?.portfolio}`}>Visit</Link>}
            </div>
          </div>

          {/* Portfolio  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">
              Portfolio
            </h4>
            <div className="border-gray-700 border-1 rounded-xl flex justify-start overflow-clip">
              <p className="text-white/50 px-3 bg-gray-800 py-3">
                https://
              </p>
            <input
              className="w-full py-3 outline-none px-1 rounded-xl text-white/50"
              value={
                context?.user?.socialMedia?.portfolio || "ansibtri.github.io"
              }
            />
            {context?.user?.socialMedia?.portfolio && <Link className="px-6 bg-gray-800 py-3 text-white/50" target="_blank" to={`https://${context?.user?.socialMedia?.portfolio}`}>Visit</Link>}
            </div>
          </div>

          {/* LinkedIn Profile  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">
              LinkedIn
            </h4>
            <div className="border-gray-700 border-1 rounded-xl flex justify-start overflow-clip">
              <p className="text-white/50 px-3 bg-gray-800 py-3">
                https://www.linkedin.com/in/
              </p>
              <input
                className="w-full py-3  px-1 outline-none  text-white/50"
                value={context?.user?.socialMedia?.linkedIn || "/username"}
              />
              {context?.user?.socialMedia?.linkedIn && <Link className="px-6 bg-gray-800 py-3 text-white/50" target="_blank" to={`https://${context?.user?.socialMedia?.linkedIn}`}>Visit</Link>}
            </div>
          </div>

          {/* GitHub Profile  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">GitHub</h4>
            <div className="border-gray-700 border-1 rounded-xl flex justify-start overflow-clip">
              <p className="text-white/50 px-3 bg-gray-800 py-3">
              https://github.com/
              </p>
              <input
              className="w-full py-3 outline-none px-1 rounded-xl text-white/50"
              value={context?.user?.socialMedia?.github || "@username"}
            />
            {context?.user?.socialMedia?.linkedIn && <Link className="px-6 bg-gray-800 py-3 text-white/50" target="_blank" to={`https://${context?.user?.socialMedia?.github}`}>Visit</Link>}
            </div>
            
          </div>

          {/* YouTube  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">YouTube</h4>
            <div className="border-gray-700 border-1 rounded-xl flex justify-start overflow-clip">
              <p className="text-white/50 px-3 bg-gray-800 py-3">
              https://www.youtube.com/
              </p>
            <input
              className="w-full py-3 outline-none px-1 rounded-xl text-white/50"
              value={
                context?.user?.socialMedia?.youtube || "@channel"
              }
            />
            {context?.user?.socialMedia?.youtube && <Link className="px-6 bg-gray-800 py-3 text-white/50" target="_blank" to={`https://${context?.user?.socialMedia?.youtube}`}>Visit</Link>}
            </div>
          </div>

          {/* Bio  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">Bio</h4>
            <textarea
              className="w-full py-2 border-gray-700 border-1 px-2 rounded-xl text-white/50"
              value={context.user.bio || "No bio yet!!!"}
            ></textarea>
          </div>

          {/* Gender  */}
          <div className="mx-23 ">
            <h4 className="text-md font-bold text-white py-4 mt-12">Gender</h4>
            <div className="flex justify-start items-center gap-3 border-1 py-3 px-3 rounded-xl border-gray-700">
              <label
                name="gender"
                className="text-white flex justify-start items-center gap-3"
              >
                <p className="">Male</p>
                <input name="gender" type="radio" value="Male" />
              </label>
              <label
                name="gender"
                className="text-white flex justify-start items-center gap-3"
              >
                <p className="">Female</p>
                <input name="gender" type="radio" value="Female" />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end items-center px-30 py-10">
            <input
              type="submit"
              className="bg-blue-700 text-white w-[200px] cursor-pointer px-3 py-2 rounded-lg"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
