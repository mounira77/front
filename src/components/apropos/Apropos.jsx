import "./apropos.scss";
// composant qui affiche apropos de moi
const Apropos = (props) => {
  return (
    <div className=" container apropos">
      <h2>À propos de moi</h2>
      <p>
        Bienvenue sur mon site OrientalSweets! Je suis passionné de cuisine et
        j'adore partager des recettes traditionnelles avec les autres amateurs
        de cuisine.
      </p>
      <p>
        Je suis convaincu que la nourriture est bien plus qu'une simple
        nécessité ; c'est une forme d'expression artistique qui peut évoquer des
        émotions et rassembler les gens autour de la table.
      </p>
      <p>
        Sur ce site, vous trouverez une sélection des recettes qui representent
        un héritage de la patisserie orientale. J'espère que ces recettes vous
        inspireront à explorer de nouvelles saveurs et à créer des moments
        inoubliables en cuisine.
      </p>
      <p>
        Merci de visiter mon site et de faire partie de cette aventure culinaire
        avec moi !
      </p>
    </div>
  );
};

export default Apropos;
