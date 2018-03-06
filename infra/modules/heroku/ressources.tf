# Create a Heroku pipeline
resource "heroku_pipeline" "my_pipeline" {
  name = "wsf-pipeline-test"
}

# Create a new Heroku app
resource "heroku_app" "development" {
  name   = "wsf-app-development-test"
}

# Couple apps to different pipeline stages
resource "heroku_pipeline_coupling" "stage_development" {
  app      = "${heroku_app.development.name}"
  pipeline = "${heroku_pipeline.my_pipeline.id}"
  stage    = "development"
}
