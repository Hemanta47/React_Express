export default function MyInformation(
    { id, name, email }: {
        id: string,
        name: string,
        email?: string
    }) {
    return (
        <>
            <div style={{ margin: "0 0 10px", border: "2px solid #fff", padding: "1rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
                <p style={{ fontSize: "2rem" }}>{name} Info:</p>
                <p>Id: {id}</p>
                <p>Name: {name}</p>
                {
                    email ? <p>Email: {email}</p>
                        : <p>
                            Email: Not Given
                        </p>
                }
            </div>
        </>
    )
}

