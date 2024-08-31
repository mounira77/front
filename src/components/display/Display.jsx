import LiListIngredient from "../liList/LiList";
import LiListStep from "../liListStep/LiListStep";
//composant pour afficher le contenu de la recette
const Display = (props) => {
  const {
    title,
    designation,
    reference,
    tags,
    nbr_pieces,
    ingredients,
    steps,
    id_category,
    id_user,
    filePath,
    mimeType,
    originalName,
    size,
    referenceImg,
    url,
  } = props;

  return (
    <div>
      <h1>title={title}</h1>
      <p>designation={designation}</p>
      <p>reference={reference}</p>
      <p>tags={tags}</p>
      <p>nbr_pieces={nbr_pieces}</p>

      <LiListIngredient array={ingredients} />

      <LiListStep array={steps} />
      <p>id_category={id_category}</p>
      <p>id_user{id_user}</p>
      <p>filePath={filePath}</p>
      <img src={url} alt="" />

      <img src={filePath} />
      <p> mimeType={mimeType}</p>
      <p>originalName={originalName}</p>
      <p>size={size}</p>
      <p>referenceImg={referenceImg}</p>
    </div>
  );
};

export default Display;
