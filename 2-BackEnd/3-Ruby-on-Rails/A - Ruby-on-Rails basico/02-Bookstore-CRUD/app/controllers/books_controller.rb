class BooksController < ApplicationController
  def index
    @books = BookCatalog.new.recent
  end

  def create
    @book = Book.create!(book_params)
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :price)
  end
end
