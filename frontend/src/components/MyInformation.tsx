export default function MyInformation(
    { id, name, email }: {
        id: string,
        name: string,
        email?: string
    }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-600 flex flex-col gap-2 hover:shadow-md hover:shadow-blue-500">
            <h2 className="text-lg font-bold text-gray-900">{name} Info:</h2>
            <p className="text-sm text-gray-600 break-all">Id: {id}</p>
            <p className="text-sm text-gray-600">Name: {name}</p>
            <p className="text-sm text-gray-600">
                Email: {email || "Not Given"}
            </p>
        </div>
    );
}
