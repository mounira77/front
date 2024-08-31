import "./displaySearch.scss";
// ce composant est aussi pour l'affichage de la recette
const DisplaySearch = (props) => {
  const { title, designation, reference, nbr_pieces, alt, url, referenceImg } =
    props;

  return (
    <div className="search ">
      <div className="search-img">
        <img src={url} alt={alt} />
        <p>Source de l'image: {referenceImg}</p>
      </div>
      <div>
        <h1>{title}</h1>
        <p>{designation}</p>
        <p>Source de la recette: {reference}</p>
        <p>Nombre de pieces: {nbr_pieces}</p>
      </div>
    </div>
  );
};

export default DisplaySearch;
