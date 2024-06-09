import Button from "@/components/Button";

const Home = () => {
  return (
    <div>
      Home
      <Button
        title="Subscribe"
        className="text-white border bg-red-500 border-white px-4 py-3 rounded-md tracking-[0.15em] uppercase text-sm transition ease hover:bg-black"
      />
      <Button
        title="Subscribe"
        className="text-white border bg-blue-500 border-white px-4 py-3 rounded-md tracking-[0.15em] uppercase text-sm transition ease hover:bg-black"
      />
    </div>
  );
};

export default Home;
