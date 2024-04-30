
export default function ficheSecu()
{

	const generateForm = () =>	{
		return (
		<form>

			<div class="row ms-4">
				<div class="col col-sm-3 m-2 ">
					<div class="d-flex align-items-center">
						<label for="lieu" class="me-2 fw-bold">Date</label>
						<input type="date" class="form-control" id="lieu" />
					</div>
				</div>
				<div class="col col-sm-6 m-2 ms-5">
					<div class="d-flex align-items-center">
						<label for="lieu" class="me-2 fw-bold">Lieu</label>
						<input type="text" class="form-control" id="lieu" readOnly value="CARRIERE DE BECON LES GRANITS . chemin des coteaux, 49370 BECON LES GRANITS"/>
					</div>
				</div>


				<div class="col col-sm-7 m-2 mt-3">
					<div class="d-flex align-items-center">
						<label for="lieu" class="me-2 fw-bold">Club</label>
						<input type="text" class="form-control" id="lieu" readOnly placeholder="Nom de club"/>
					</div>
				</div>
			</div>

			<div class="row ms-4 mt-5">
				<div class="col col-sm-3 m-2 ">
					<div class="d-flex align-items-center">
						<label for="lieu" class="me-2 fw-bold">Date</label>
						<input type="date" class="form-control" id="lieu" />
					</div>
				</div>
				<div class="col col-sm-6 m-2 ms-5">
					<div class="d-flex align-items-center">
						<label for="lieu" class="me-2 fw-bold">Lieu</label>
						<input type="text" class="form-control" id="lieu" readOnly value="CARRIERE DE BECON LES GRANITS . chemin des coteaux, 49370 BECON LES GRANITS"/>
					</div>
				</div>


				<div class="col col-sm-7 m-2 mt-4">
					<div class="d-flex align-items-center">
						<label for="lieu" class="me-2 fw-bold">Club</label>
						<input type="text" class="form-control" id="lieu" readOnly placeholder="Nom de club"/>
					</div>
				</div>
			</div>



		</form>

		)
	}



	return (
		<div className="col-sm-12">
			<h1 className='titre mt-1'>Création d'une fiche de sécurité</h1>

			{generateForm()}
		</div>
	)
}