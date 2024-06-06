const DetallePokemon = (props) => {
    return (
        <>
            <h2> Name: {props.detallePokemon.name} </h2>
            <p> Height: {props.detallePokemon.height} </p>
            <p> Weight: {props.detallePokemon.weight} </p>
            <img src={props.detallePokemon.sprites.other.dream_world.front_default} alt={props.detallePokemon.name} />
        </>
    )
}

export default DetallePokemon;