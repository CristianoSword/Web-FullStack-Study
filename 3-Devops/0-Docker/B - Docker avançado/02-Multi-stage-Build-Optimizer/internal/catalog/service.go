package catalog

type Product struct {
	SKU   string  `json:"sku"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Stage string  `json:"stage"`
}

type ArtifactReport struct {
	BinaryName        string   `json:"binaryName"`
	RuntimeImage      string   `json:"runtimeImage"`
	BuildStages       []string `json:"buildStages"`
	Optimizations     []string `json:"optimizations"`
	ExpectedFootprint string   `json:"expectedFootprint"`
}

type Service struct{}

func NewService() Service {
	return Service{}
}

func (Service) Products() []Product {
	return []Product{
		{SKU: "GO-101", Name: "Static binary API", Price: 19.90, Stage: "builder"},
		{SKU: "DO-202", Name: "Scratch runtime image", Price: 29.90, Stage: "runtime"},
		{SKU: "CI-303", Name: "Layer cache plan", Price: 9.90, Stage: "deps"},
	}
}

func (Service) ArtifactReport() ArtifactReport {
	return ArtifactReport{
		BinaryName:   "multi-stage-server",
		RuntimeImage: "scratch",
		BuildStages: []string{
			"deps",
			"test",
			"builder",
			"runtime",
		},
		Optimizations: []string{
			"go mod download cached before source copy",
			"tests isolated in dedicated target",
			"trimpath removes local build paths",
			"ldflags strip debug symbols",
			"scratch runtime keeps only the compiled binary",
		},
		ExpectedFootprint: "runtime image should contain only one executable plus image metadata",
	}
}
