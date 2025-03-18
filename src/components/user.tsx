import { useUser} from "../services/queries"

export const User = () => {
    const user = useUser()

    if(user.isLoading || user.isPending) {
        return <div>Loading...</div>
    }

    if(user.isError) {
        return <div>Error</div>
    }

    return (
        <div>
            {user.data.map((user, index) => (
                <div key={index}>
                    <p>{user.name}</p>
                </div>
            ))}
        </div>
    )
}