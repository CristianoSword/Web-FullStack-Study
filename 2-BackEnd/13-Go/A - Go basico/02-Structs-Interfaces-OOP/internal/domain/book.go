package domain

type Genre string

const (
	GenreEngineering Genre = "engineering"
	GenreProductivity Genre = "productivity"
	GenreArchitecture Genre = "architecture"
	GenreFiction      Genre = "fiction"
)

type Book struct {
	ID          string
	ISBN        string
	Title       string
	Author      string
	Genre       Genre
	TotalCopies int
	LoanedCopies int
}

func (b *Book) AvailableCopies() int {
	return b.TotalCopies - b.LoanedCopies
}

func (b *Book) CanBorrow() bool {
	return b.AvailableCopies() > 0
}
